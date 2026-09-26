"use client";

import { useRef, useState, useCallback } from "react";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original",
  afterLabel = "Pixora",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-xl border border-border bg-navy shadow-raised"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={beforeSrc}
        alt={beforeLabel}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      <div
        className="absolute inset-y-0 w-[2px] bg-white/80"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-raised">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 3L1 7L4 11" stroke="#0C2233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 3L13 7L10 11" stroke="#0C2233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-sm bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-sm bg-teal/90 px-2.5 py-1 text-xs font-medium text-white">
        {afterLabel}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparison slider position"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
