import React, { useState, useRef, useCallback } from "react";
import { MoveHorizontal, Bike } from "lucide-react";

interface CompareSliderProps {
  beforeImage: string;
  beforeLabel: string;
  afterImage: string;
  afterLabel: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({
  beforeImage,
  beforeLabel,
  afterImage,
  afterLabel,
}) => {
  const [position, setPosition] = useState(52);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, raw));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 4));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Perbandingan visual sebelum dan sesudah desain ulang"
      aria-valuemin={4}
      aria-valuemax={96}
      aria-valuenow={Math.round(position)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="relative w-full aspect-[3/2] overflow-hidden rounded-xl border border-neutral-300 bg-neutral-200 select-none cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      {/* After Image (Full background) */}
      {afterError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-200 text-neutral-600 p-6">
          <Bike className="w-10 h-10 mb-2 opacity-60" />
          <span className="text-sm font-medium">{afterLabel}</span>
        </div>
      ) : (
        <img
          src={afterImage}
          alt={afterLabel}
          referrerPolicy="no-referrer"
          draggable={false}
          onError={() => setAfterError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Before Image (Clipped on left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-300 text-neutral-700 p-6">
            <Bike className="w-10 h-10 mb-2 opacity-60" />
            <span className="text-sm font-medium">{beforeLabel}</span>
          </div>
        ) : (
          <img
            src={beforeImage}
            alt={beforeLabel}
            referrerPolicy="no-referrer"
            draggable={false}
            onError={() => setBeforeError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Scrim labels at bottom corners */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute bottom-3 left-4 text-xs font-medium text-white tracking-wide">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute bottom-3 right-4 text-xs font-medium text-amber-300 tracking-wide text-right">
        {afterLabel}
      </div>

      {/* Divider line & handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-sm"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900 text-white border-2 border-white flex items-center justify-center shadow-md">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
