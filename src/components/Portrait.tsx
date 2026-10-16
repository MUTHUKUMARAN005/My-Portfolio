import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Camera, Download, LoaderCircle, RotateCcw } from "lucide-react";
import fallbackPortrait from "@/assets/portrait.png";
import { preparePortrait, type PortraitPhoto } from "@/lib/portrait";
import { cn } from "@/utils/cn";

const STORAGE_KEY = "muthukumaran-portrait-v1";
const embeddedPhotos = import.meta.glob<string>("/src/assets/muthukumaran-portrait.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const embeddedPhoto = Object.values(embeddedPhotos)[0];

type PortraitState = {
  photo: PortraitPhoto | null;
  busy: boolean;
  error: string;
  message: string;
  attach: (file: File) => Promise<void>;
  reset: () => void;
};

const PortraitContext = createContext<PortraitState | null>(null);

function readSavedPhoto(): PortraitPhoto | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      saved &&
      typeof saved.src === "string" &&
      /^data:image\/(webp|png|jpeg);base64,/.test(saved.src) &&
      Number.isFinite(saved.width) && saved.width > 0 &&
      Number.isFinite(saved.height) && saved.height > 0
    ) return saved;
  } catch {
    // The attachment still works when private browsing disables local storage.
  }
  return null;
}

export function PortraitProvider({ children }: { children: ReactNode }) {
  const [photo, setPhoto] = useState<PortraitPhoto | null>(readSavedPhoto);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const processing = useRef(false);

  const attach = async (file: File) => {
    if (processing.current) return;
    processing.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 32));
      const next = await preparePortrait(file);
      setPhoto(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setMessage("Updated in both sections. Saved on this device.");
      } catch {
        setMessage("Updated in both sections. Storage is full, so this photo will not survive a refresh.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The photo could not be attached. Please try again.");
    } finally {
      setBusy(false);
      processing.current = false;
    }
  };

  const reset = () => {
    setPhoto(null);
    setError("");
    setMessage(embeddedPhoto ? "Restored the site's portrait." : "Restored the placeholder portrait.");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The in-memory reset still succeeds when storage is unavailable.
    }
  };

  return (
    <PortraitContext.Provider value={{ photo, busy, error, message, attach, reset }}>
      {children}
    </PortraitContext.Provider>
  );
}

export function usePortrait() {
  const value = useContext(PortraitContext);
  if (!value) throw new Error("Portrait components must be inside PortraitProvider.");
  return value;
}

export function PortraitImage({ variant, className }: { variant: "hero" | "about"; className?: string }) {
  const { photo } = usePortrait();
  const hasPersonalPhoto = Boolean(photo || embeddedPhoto);
  return (
    <img
      src={photo?.src ?? embeddedPhoto ?? fallbackPortrait}
      alt={hasPersonalPhoto ? "Muthukumaran N in a navy blazer and blue shirt" : "Temporary portrait silhouette"}
      width={photo?.width ?? 1024}
      height={photo?.height ?? 1536}
      data-portrait={variant}
      data-personal={hasPersonalPhoto ? "true" : "false"}
      className={cn("portrait-image", className)}
      loading={variant === "hero" ? "eager" : "lazy"}
      fetchPriority={variant === "hero" ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}

export function PortraitAttachment() {
  const input = useRef<HTMLInputElement>(null);
  const { photo, busy, error, message, attach, reset } = usePortrait();

  if (embeddedPhoto && !photo) return null;

  return (
    <div className="relative z-30 mt-4 flex flex-col items-center gap-2 text-center">
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        aria-label="Attach your portrait photo"
        disabled={busy}
        className="sr-only"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (file) void attach(file);
          event.currentTarget.value = "";
        }}
      />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="group inline-flex items-center gap-2 rounded-full border border-sky/25 bg-ink/70 px-4 py-2.5 text-[11.5px] font-medium text-sky backdrop-blur transition-all hover:border-sky/70 hover:bg-sky/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? <LoaderCircle size={14} className="animate-spin" /> : <Camera size={14} />}
          {busy ? "Preparing your photo..." : photo ? "Change photo" : "Attach your photo"}
        </button>
        {photo && (
          <>
            <a
              href={photo.src}
              download={`muthukumaran-portrait.${photo.src.startsWith("data:image/png") ? "png" : "webp"}`}
              aria-label="Save the prepared portrait for permanent hosting"
              title="Save the prepared portrait for permanent hosting"
              className="inline-flex items-center gap-1.5 text-[10.5px] text-white/50 transition-colors hover:text-sky focus-visible:outline-2 focus-visible:outline-sky"
            >
              <Download size={12} /> Save image
            </a>
            <button
              type="button"
              onClick={reset}
              disabled={busy}
              aria-label="Restore placeholder portrait"
              title="Restore placeholder portrait"
              className="p-1.5 text-white/40 transition-colors hover:text-white disabled:opacity-40"
            >
              <RotateCcw size={12} />
            </button>
          </>
        )}
      </div>
      <p className="max-w-[270px] text-[10px] leading-relaxed text-white/35">
        {photo
          ? "Photo stays on this device. Save the image to embed it in your published site."
          : "Use your exact photo. A plain white backdrop is removed automatically, on your device."}
      </p>
      <p
        aria-live="polite"
        aria-atomic="true"
        className={cn("max-w-[270px] text-[10.5px] leading-relaxed", error ? "text-red-300" : "text-emerald-300/80")}
      >
        {error || message}
      </p>
    </div>
  );
}