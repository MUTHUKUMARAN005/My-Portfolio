# Add Your Portrait

The chat photo was not available as a file in the project. The site uses the original placeholder until an exact image is attached.

1. Open **About** and select **Attach your photo**.
2. Choose your original JPG or PNG. The app removes a plain white background locally, trims empty margins, and updates both portraits. It does not generate a new face.
3. The attached photo is saved in this browser only. Use **Save image** to download the prepared portrait.
4. For permanent, site-wide embedding, add the downloaded file to `src/assets/muthukumaran-portrait.webp` (or use `.png`, `.jpg`, or `.jpeg` if that is the actual file format).
5. Run `npm run build`. The site automatically picks up this asset and hides the attachment control for visitors.

The hero preserves the full portrait's proportions. About is top-aligned so hair and face stay in view. The bottom of the jacket fades into the dark background, while the face stays fully opaque.