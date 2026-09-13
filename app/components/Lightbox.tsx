"use client";
import { useEffect } from "react";

// Corner badge marking an image as click-to-enlarge. The cursor alone says this
// on desktop but is invisible on touch, so the hint has to be drawn.
export function ZoomHint() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-2 right-2 z-[5] w-6 h-6 flex items-center justify-center bg-card border-2 border-ink shadow-pixelSm text-ink"
    >
      <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6.8" cy="6.8" r="4.3" />
        <path d="M10.2 10.2 L14.3 14.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Fullscreen image viewer. Closes on backdrop click, the X, or Escape.
export default function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 sm:p-8 cursor-zoom-out"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[90vh] object-contain border-[3px] border-white cursor-default"
      />
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-3 right-4 sm:top-5 sm:right-7 font-pixel text-white text-[26px] leading-none p-2 hover:text-purple"
      >
        &times;
      </button>
    </div>
  );
}
