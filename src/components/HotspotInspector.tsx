import React, { useState } from "react";
import { Maximize2, Bike } from "lucide-react";
import type { Language, RedesignConcept } from "../data/concepts";

interface HotspotInspectorProps {
  concept: RedesignConcept;
  lang: Language;
  onOpenLightbox: () => void;
}

export const HotspotInspector: React.FC<HotspotInspectorProps> = ({
  concept,
  lang,
  onOpenLightbox,
}) => {
  const [selectedId, setSelectedId] = useState<string>(concept.hotspots[0]?.id ?? "");
  const [showPins, setShowPins] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);

  const activeSpot =
    concept.hotspots.find((h) => h.id === selectedId) ?? concept.hotspots[0];

  React.useEffect(() => {
    setSelectedId(concept.hotspots[0]?.id ?? "");
    setImgFailed(false);
  }, [concept]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left: Interactive image with pins */}
      <div className="lg:col-span-8 flex flex-col gap-3">
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-neutral-300 bg-neutral-200">
          {imgFailed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-200 text-neutral-600 p-8">
              <Bike className="w-12 h-12 mb-3 opacity-60" />
              <p className="text-sm font-semibold">
                {lang === "id" ? concept.nameId : concept.nameEn}
              </p>
            </div>
          ) : (
            <img
              src={concept.image}
              alt={lang === "id" ? concept.nameId : concept.nameEn}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          )}

          {showPins &&
            concept.hotspots.map((spot) => {
              const isSelected = activeSpot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedId(spot.id)}
                  aria-label={lang === "id" ? spot.partId : spot.partEn}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-semibold tabular-nums flex items-center justify-center transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                    isSelected
                      ? "bg-amber-600 text-white scale-110 ring-4 ring-white/80 shadow-md"
                      : "bg-neutral-900/90 text-white hover:bg-amber-600 ring-2 ring-white/75"
                  }`}
                >
                  {spot.number}
                </button>
              );
            })}

          {/* Overlay action bar */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPins((s) => !s)}
              className="px-3 py-1.5 text-xs font-medium bg-neutral-900/85 text-white rounded-md hover:bg-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {showPins
                ? lang === "id"
                  ? "Sembunyikan Pin"
                  : "Hide Pins"
                : lang === "id"
                ? "Tampilkan Pin"
                : "Show Pins"}
            </button>
            <button
              type="button"
              onClick={onOpenLightbox}
              aria-label={lang === "id" ? "Perbesar gambar" : "Enlarge image"}
              className="p-2 bg-neutral-900/85 text-white rounded-md hover:bg-neutral-900 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Palette & metadata line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-4">
            {concept.palette.map((swatch) => (
              <div key={swatch.label} className="flex items-center gap-2 text-xs text-neutral-700">
                <span
                  className="w-3.5 h-3.5 rounded-sm border border-black/15 shrink-0"
                  style={{ backgroundColor: swatch.hex }}
                />
                <span>{swatch.label}</span>
              </div>
            ))}
          </div>
          <span className="text-xs font-mono text-neutral-500 tabular-nums">
            {lang === "id" ? "Inspirasi:" : "Inspired by:"} {concept.inspiration}
          </span>
        </div>
      </div>

      {/* Right: Component fabrication breakdown */}
      <div className="lg:col-span-4 flex flex-col justify-between bg-[#ECEAE4] border border-neutral-300 rounded-xl p-6">
        <div>
          <div className="text-xs text-neutral-500 mb-2">
            {lang === "id" ? "Inspeksi Komponen GSX-S150" : "GSX-S150 Component Inspection"}
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-neutral-900 mb-4">
            {lang === "id" ? concept.nameId : concept.nameEn}
          </h3>

          {/* Selector list of 6 hotspots */}
          <div className="flex flex-col divide-y divide-neutral-300/80 border-y border-neutral-300/80 mb-5">
            {concept.hotspots.map((spot) => {
              const isSelected = activeSpot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedId(spot.id)}
                  className={`flex items-center justify-between gap-3 py-2.5 px-2 text-left transition-colors ${
                    isSelected
                      ? "bg-white text-neutral-900 font-semibold"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-white/50"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm truncate">
                    <span
                      className={`font-mono text-xs tabular-nums w-5 text-center ${
                        isSelected ? "text-amber-700 font-semibold" : "text-neutral-500"
                      }`}
                    >
                      0{spot.number}
                    </span>
                    <span className="truncate">
                      {lang === "id" ? spot.partId : spot.partEn}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {activeSpot && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-amber-800">
                0{activeSpot.number}. {lang === "id" ? activeSpot.partId : activeSpot.partEn}
              </div>
              <p className="text-sm leading-relaxed text-neutral-800">
                {lang === "id" ? activeSpot.gsxAdaptationId : activeSpot.gsxAdaptationEn}
              </p>
              <div className="pt-2 border-t border-neutral-300 text-xs font-mono text-neutral-600 leading-relaxed">
                {activeSpot.fabricationSpec}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-300 flex items-center justify-between text-xs">
          <span className="text-neutral-600">
            {lang === "id" ? "Estimasi Bangun" : "Est. Build Budget"}
          </span>
          <span className="font-mono font-semibold text-neutral-900 tabular-nums">
            {concept.specs.budgetRangeIdr}
          </span>
        </div>
      </div>
    </div>
  );
};
