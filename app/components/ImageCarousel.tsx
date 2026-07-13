"use client";
import { useRef, useState } from "react";

// Instagram-style swipe carousel: drag/swipe (pointer events cover touch + mouse),
// hover arrows on desktop, clickable dots, arrow-key support.
export default function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const go = (i: number) => setIndex(Math.max(0, Math.min(images.length - 1, i)));

  const onPointerDown = (e: React.PointerEvent) => {
    if (images.length < 2) return;
    dragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setDragX(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (Math.abs(dragX) > 50) go(index + (dragX < 0 ? 1 : -1));
    setDragX(0);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none group/carousel outline-none"
      style={{ touchAction: "pan-y" }}
      tabIndex={0}
      role="group"
      aria-label={alt}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.stopPropagation(); go(index - 1); }
        if (e.key === "ArrowRight") { e.stopPropagation(); go(index + 1); }
      }}
    >
      <div
        className="flex w-full h-full"
        style={{
          transform: "translateX(calc(" + -index * 100 + "% + " + dragX + "px))",
          transition: dragging.current ? "none" : "transform 0.3s ease",
        }}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={alt + " " + (i + 1)} draggable={false} className="w-full h-full flex-none object-contain bg-[#111111]" />
        ))}
      </div>
      {images.length > 1 && (
        <>
          {index > 0 && (
            <button
              type="button"
              aria-label="Previous image"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => go(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 font-pixel text-white text-[20px] leading-none p-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
            >
              {"<"}
            </button>
          )}
          {index < images.length - 1 && (
            <button
              type="button"
              aria-label="Next image"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => go(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 font-pixel text-white text-[20px] leading-none p-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
            >
              {">"}
            </button>
          )}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={"Go to image " + (i + 1)}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => go(i)}
                className={"w-2 h-2 rounded-full border border-white transition-colors " + (i === index ? "bg-white" : "bg-transparent")}
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
