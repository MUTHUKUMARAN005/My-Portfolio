export type PortraitPhoto = {
  src: string;
  width: number;
  height: number;
  backgroundRemoved: boolean;
};

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const MAX_DIMENSION = 1800;

/** Remove only near-white pixels connected to the image border, never interior highlights. */
export function removeWhiteBackdrop(pixels: Uint8ClampedArray, width: number, height: number) {
  const count = width * height;
  const visited = new Uint8Array(count);
  const queue = new Uint32Array(count);
  let head = 0;
  let tail = 0;

  const isBackground = (index: number) => {
    const p = index * 4;
    if (pixels[p + 3] < 16) return true;
    const min = Math.min(pixels[p], pixels[p + 1], pixels[p + 2]);
    const max = Math.max(pixels[p], pixels[p + 1], pixels[p + 2]);
    return min >= 215 && max - min <= 28;
  };

  const edge = Math.max(1, Math.floor(Math.min(width, height) * 0.035));
  let white = 0;
  let sampled = 0;
  for (const [ox, oy] of [[0, 0], [width - edge, 0], [0, height - edge], [width - edge, height - edge]]) {
    for (let y = oy; y < oy + edge; y++) {
      for (let x = ox; x < ox + edge; x++) {
        const index = y * width + x;
        if (isBackground(index)) white++;
        sampled++;
      }
    }
  }
  if (white / sampled < 0.45) return false;

  const enqueue = (index: number) => {
    if (!visited[index] && isBackground(index)) {
      visited[index] = 1;
      queue[tail++] = index;
    }
  };

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    if (x > 0) enqueue(index - 1);
    if (x < width - 1) enqueue(index + 1);
    if (index >= width) enqueue(index - width);
    if (index < count - width) enqueue(index + width);
  }

  // Do not attempt a cutout when the photograph does not have a plain white backdrop.
  if (tail < count * 0.04) return false;

  for (let index = 0; index < count; index++) {
    const p = index * 4;
    if (visited[index]) {
      pixels[p + 3] = 0;
      continue;
    }

    const x = index % width;
    const touchesBackdrop =
      (x > 0 && visited[index - 1]) ||
      (x < width - 1 && visited[index + 1]) ||
      (index >= width && visited[index - width]) ||
      (index < count - width && visited[index + width]);
    if (!touchesBackdrop) continue;

    const min = Math.min(pixels[p], pixels[p + 1], pixels[p + 2]);
    const max = Math.max(pixels[p], pixels[p + 1], pixels[p + 2]);
    if (min < 150 || max - min > 35) continue;

    // Un-matte only the outer fringe to avoid a white outline on the dark page.
    const alpha = Math.min(1, Math.max(0.1, (255 - min) / 95));
    if (alpha >= 1) continue;
    for (let c = 0; c < 3; c++) {
      pixels[p + c] = Math.max(0, Math.round((pixels[p + c] - 255 * (1 - alpha)) / alpha));
    }
    pixels[p + 3] = Math.round(pixels[p + 3] * alpha);
  }
  return true;
}

export async function preparePortrait(file: File): Promise<PortraitPhoto> {
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) {
    throw new Error("Choose a JPG, PNG, WebP or AVIF image.");
  }
  if (file.size > MAX_FILE_SIZE) throw new Error("Please choose a photo smaller than 12 MB.");

  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    try {
      await image.decode();
    } catch {
      throw new Error("This image could not be opened. Try saving it as a JPG or PNG.");
    }

    const scale = Math.min(1, MAX_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Your browser cannot prepare this photo. Please try another browser.");
    ctx.drawImage(image, 0, 0, width, height);
    const frame = ctx.getImageData(0, 0, width, height);
    const backgroundRemoved = removeWhiteBackdrop(frame.data, width, height);
    if (backgroundRemoved) ctx.putImageData(frame, 0, 0);

    let top = height;
    let bottom = -1;
    let left = width;
    let right = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (frame.data[(y * width + x) * 4 + 3] < 25) continue;
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
    }
    if (bottom < top) throw new Error("No portrait was found. Please choose a photo with a visible subject.");

    // Trim empty margins, leaving a little headroom without cropping the face or hair.
    const padding = Math.round(Math.max(width, height) * 0.018);
    top = Math.max(0, top - padding);
    left = Math.max(0, left - padding);
    right = Math.min(width - 1, right + padding);
    bottom = Math.min(height - 1, bottom + padding);
    const output = document.createElement("canvas");
    output.width = right - left + 1;
    output.height = bottom - top + 1;
    const outputCtx = output.getContext("2d");
    if (!outputCtx) throw new Error("Your browser could not save this photo.");
    outputCtx.drawImage(canvas, left, top, output.width, output.height, 0, 0, output.width, output.height);

    return {
      src: output.toDataURL("image/webp", 0.96),
      width: output.width,
      height: output.height,
      backgroundRemoved,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}