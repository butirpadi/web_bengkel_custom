import React, { useState, useEffect } from "react";
import { ArrowRight, Maximize2, X, Bike } from "lucide-react";
import {
  BASELINE_REFERENCE,
  REDESIGN_CONCEPTS,
  STOCK_VS_DIRT_MATRIX,
  type Language,
} from "./data/concepts";
import { CompareSlider } from "./components/CompareSlider";
import { HotspotInspector } from "./components/HotspotInspector";
import { BuildAdvisorPanel } from "./components/BuildAdvisorPanel";

export default function App() {
  const [lang, setLang] = useState<Language>("id");
  const [activeConceptId, setActiveConceptId] = useState<string>(REDESIGN_CONCEPTS[0].id);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(
    null
  );
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const activeConcept =
    REDESIGN_CONCEPTS.find((c) => c.id === activeConceptId) ?? REDESIGN_CONCEPTS[0];

  useEffect(() => {
    setHeroImgFailed(false);
  }, [activeConceptId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copy = {
    id: {
      navConcepts: "Konsep Desain",
      navCompare: "Komparasi",
      navSpecs: "Spesifikasi GSX",
      navAdvisor: "Konsultasi",
      navCta: "Rancang Build",
      metaStrip: "Basis Suzuki GSX-S150 · 147.3cc DOHC · 4 Konsep Vintage Dirt Bike",
      heroHeadline: "Desain Ulang Suzuki GSX-S150 Menjadi Vintage Dirt Bike.",
      heroLead:
        "Mengubah proporsi streetfighter injeksi modern menjadi motor trail klasik era 1974–1982. Mesin DOHC berpendingin cairan dan rangka utama dipertahankan, sementara tangki, subframe, knalpot high-mount, dan kaki-kaki 21/18 inci dibangun ulang.",
      heroPrimaryCta: "Bedah Komponen Konsep",
      heroSecondaryAction: "Bandingkan Foto Awal",
      kpi1Label: "Basis Mesin Donor",
      kpi1Value: "147.3 cc DOHC",
      kpi2Label: "Konversi Lingkar Roda",
      kpi2Value: "21\" / 18\" Spoke",
      kpi3Label: "Ground Clearance Target",
      kpi3Value: "260 – 280 mm",
      kpi4Label: "Estimasi Pengerjaan",
      kpi4Value: "6 – 8 Minggu",
      sec1Title: "01. Empat Interpretasi Vintage Dirt Bike",
      sec1Sub:
        "Pilih konsep di bawah untuk menginspeksi enam titik rekayasa rangka, tangki EFI, dan kaki-kaki pada sasis Suzuki GSX-S150.",
      sec2Title: "02. Komparasi Langsung dari Referensi Awal",
      sec2Sub:
        "Geser pemisah foto untuk melihat perubahan siluet dari urban scrambler awal menuju rancangan vintage dirt bike pilihan.",
      sec2ChangesHeading: "Perubahan Desain Utama",
      sec2RefHeading: "Foto Acuan Pengguna",
      sec3Title: "03. Matriks Konversi Teknis GSX-S150",
      sec3Sub:
        "Perbandingan parameter standar pabrikan Suzuki GSX-S150 terhadap spesifikasi modifikasi vintage dirt bike agar motor tetap andal di jalur tanah maupun aspal.",
      colParam: "Parameter",
      colStock: "Standar GSX-S150",
      colDirt: "Konversi Vintage Dirt",
      colNote: "Catatan Bengkel",
      sec4Title: "04. Susun Blueprint & Estimasi Biaya",
      sec4Sub:
        "Sesuaikan tahun motor donor, tinggi badan, medan berkendara, dan alokasi dana untuk menghasilkan panduan fabrikasi khusus.",
      footerNote: "Studio Konsep & Rekayasa Modifikasi Suzuki GSX-S150",
    },
    en: {
      navConcepts: "Concepts",
      navCompare: "Compare",
      navSpecs: "GSX Specs",
      navAdvisor: "Build Planner",
      navCta: "Plan Build",
      metaStrip: "Suzuki GSX-S150 Base · 147.3cc DOHC · 4 Vintage Dirt Bike Concepts",
      heroHeadline: "Redesigning the Suzuki GSX-S150 into a Vintage Dirt Bike.",
      heroLead:
        "Transforming a modern liquid-cooled EFI streetfighter into an authentic 1974–1982 vintage enduro machine. The DOHC 150cc powertrain and perimeter core stay intact while the tank, subframe, high-mount exhaust, and 21/18-inch spoke wheelset are re-engineered.",
      heroPrimaryCta: "Inspect Build Blueprint",
      heroSecondaryAction: "Compare Reference",
      kpi1Label: "Donor Engine Base",
      kpi1Value: "147.3 cc DOHC",
      kpi2Label: "Wheelset Conversion",
      kpi2Value: "21\" / 18\" Spoke",
      kpi3Label: "Target Ground Clearance",
      kpi3Value: "260 – 280 mm",
      kpi4Label: "Workshop Lead Time",
      kpi4Value: "6 – 8 Weeks",
      sec1Title: "01. Four Vintage Dirt Bike Concepts",
      sec1Sub:
        "Select a concept below to inspect six mechanical adaptation points across the Suzuki GSX-S150 frame, EFI tank, and off-road running gear.",
      sec2Title: "02. Direct Comparison vs. Initial Reference",
      sec2Sub:
        "Drag the divider handle across the frame to compare the initial reference photo against each vintage dirt bike redesign.",
      sec2ChangesHeading: "Key Redesign Deltas",
      sec2RefHeading: "Submitted Reference Photo",
      sec3Title: "03. GSX-S150 Technical Conversion Matrix",
      sec3Sub:
        "Side-by-side comparison between factory Suzuki GSX-S150 geometry and vintage dirt bike requirements for dependable trail and dual-sport use.",
      colParam: "Parameter",
      colStock: "Stock GSX-S150",
      colDirt: "Vintage Dirt Spec",
      colNote: "Fabrication Notes",
      sec4Title: "04. Custom Fabrication & Budget Planner",
      sec4Sub:
        "Configure your donor year, rider height, terrain, and budget tier to generate a tailored workshop parts list and sequence.",
      footerNote: "Suzuki GSX-S150 Vintage Dirt Bike Concept & Engineering Studio",
    },
  }[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F5F2] text-[#141413]">
      {/* Strictly 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#F6F5F2]/95 backdrop-blur-sm border-b border-neutral-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-2xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0"
          >
            Karsa Dirtworks
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <a
              href="#konsep"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navConcepts}
            </a>
            <a
              href="#komparasi"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navCompare}
            </a>
            <a
              href="#spesifikasi"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navSpecs}
            </a>
            <a
              href="#konsultasi"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navAdvisor}
            </a>
          </nav>

          <div className="shrink-0">
            <a
              href="#konsultasi"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0"
            >
              {copy.navCta}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Workspace Toolbar below header */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-600">{copy.metaStrip}</div>

          <div
            role="group"
            aria-label="Language switch"
            className="inline-flex items-center gap-1 p-1 bg-[#ECEAE4] border border-neutral-300 rounded-lg"
          >
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === "id"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === "en"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Hero Split */}
        <section className="max-w-7xl mx-auto px-6 pt-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left column */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <div className="text-xs font-mono text-amber-800 mb-3">
                  {activeConcept.code}. {activeConcept.yearEra} · {activeConcept.inspiration}
                </div>
                <h1
                  className="font-display font-bold tracking-tight text-neutral-900 leading-[1.03] mb-5"
                  style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.75rem)" }}
                >
                  {copy.heroHeadline}
                </h1>
                <p className="text-base text-neutral-700 leading-relaxed max-w-xl mb-8">
                  {copy.heroLead}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#konsep"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{copy.heroPrimaryCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#komparasi"
                    className="inline-flex items-center px-4 py-3 text-sm font-medium text-neutral-800 hover:text-amber-800 underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                  >
                    {copy.heroSecondaryAction}
                  </a>
                </div>
              </div>

              {/* Compact concept selector in Hero */}
              <div className="mt-10 pt-5 border-t border-neutral-300">
                <div className="text-xs text-neutral-500 mb-2.5">
                  {lang === "id" ? "Pratinjau Konsep Aktif" : "Active Concept Preview"}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REDESIGN_CONCEPTS.map((c) => {
                    const active = c.id === activeConcept.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveConceptId(c.id)}
                        className={`px-3 py-2 text-left rounded-lg border text-xs transition-colors ${
                          active
                            ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                        }`}
                      >
                        <div
                          className={`font-mono text-[11px] tabular-nums ${
                            active ? "text-amber-300" : "text-neutral-500"
                          }`}
                        >
                          {c.yearEra}
                        </div>
                        <div className="font-semibold truncate">
                          {c.id === "rm-enduro"
                            ? "RM-150"
                            : c.id === "baja-desert"
                            ? "Baja TS"
                            : c.id === "dakar-rally"
                            ? "DR Dakar"
                            : "ISDT 76"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column: Dominant 3:2 Hero Visual */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-full min-h-[320px] aspect-[3/2] rounded-xl overflow-hidden border border-neutral-300 bg-neutral-200">
                {heroImgFailed ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-200 text-neutral-600 p-8">
                    <Bike className="w-12 h-12 mb-3 opacity-60" />
                    <span className="text-sm font-medium">
                      {lang === "id" ? activeConcept.nameId : activeConcept.nameEn}
                    </span>
                  </div>
                ) : (
                  <img
                    src={activeConcept.image}
                    alt={lang === "id" ? activeConcept.nameId : activeConcept.nameEn}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full lg:h-full object-cover"
                  />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                <div className="absolute bottom-4 left-5 right-14 text-white">
                  <div className="text-xs font-mono text-amber-300 mb-0.5">
                    {lang === "id"
                      ? activeConcept.terrainFocusId
                      : activeConcept.terrainFocusEn}
                  </div>
                  <div className="font-display text-2xl font-bold tracking-tight">
                    {lang === "id" ? activeConcept.nameId : activeConcept.nameEn}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: activeConcept.image,
                      title: lang === "id" ? activeConcept.nameId : activeConcept.nameEn,
                    })
                  }
                  aria-label={lang === "id" ? "Perbesar foto konsep" : "Enlarge concept photo"}
                  className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 4-Column Full-Width KPI Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 border-y border-neutral-300 py-5">
            <div>
              <div className="text-xs text-neutral-500 mb-1">{copy.kpi1Label}</div>
              <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                {copy.kpi1Value}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">{copy.kpi2Label}</div>
              <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                {copy.kpi2Value}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">{copy.kpi3Label}</div>
              <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                {copy.kpi3Value}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">{copy.kpi4Label}</div>
              <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                {copy.kpi4Value}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: 4 Redesign Concepts + Interactive Hotspot Inspector */}
        <section id="konsep" className="max-w-7xl mx-auto px-6 py-14 border-b border-neutral-300">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              {copy.sec1Title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {copy.sec1Sub}
            </p>
          </div>

          {/* 4 Concept Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {REDESIGN_CONCEPTS.map((c) => {
              const isSelected = c.id === activeConcept.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveConceptId(c.id)}
                  className={`group text-left rounded-xl overflow-hidden border transition-colors ${
                    isSelected
                      ? "bg-white border-neutral-900 ring-1 ring-neutral-900"
                      : "bg-[#ECEAE4] border-neutral-300 hover:bg-white hover:border-neutral-500"
                  }`}
                >
                  <div className="aspect-[3/2] w-full overflow-hidden bg-neutral-200">
                    <img
                      src={c.image}
                      alt={lang === "id" ? c.nameId : c.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1 tabular-nums">
                      <span>
                        {c.code} · {c.yearEra}
                      </span>
                      <span className={isSelected ? "text-amber-700 font-semibold" : ""}>
                        {c.specs.seatHeightMm} mm
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">
                      {lang === "id" ? c.nameId : c.nameEn}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                      {lang === "id" ? c.taglineId : c.taglineEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Hotspot Blueprint Inspector */}
          <HotspotInspector
            concept={activeConcept}
            lang={lang}
            onOpenLightbox={() =>
              setLightboxImage({
                src: activeConcept.image,
                title: lang === "id" ? activeConcept.nameId : activeConcept.nameEn,
              })
            }
          />
        </section>

        {/* Section 2: Before / After Wipe Comparison */}
        <section id="komparasi" className="max-w-7xl mx-auto px-6 py-14 border-b border-neutral-300">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
                {copy.sec2Title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {copy.sec2Sub}
              </p>
            </div>

            {/* Concept switch buttons for slider */}
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECEAE4] border border-neutral-300 rounded-lg">
              {REDESIGN_CONCEPTS.map((c) => {
                const isSelected = c.id === activeConcept.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveConceptId(c.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-white text-neutral-900 shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {c.yearEra}{" "}
                    {c.id === "rm-enduro"
                      ? "RM-150"
                      : c.id === "baja-desert"
                      ? "Baja TS"
                      : c.id === "dakar-rally"
                      ? "Dakar"
                      : "ISDT"}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <CompareSlider
                beforeImage={BASELINE_REFERENCE.image}
                beforeLabel={
                  lang === "id" ? BASELINE_REFERENCE.nameId : BASELINE_REFERENCE.nameEn
                }
                afterImage={activeConcept.image}
                afterLabel={lang === "id" ? activeConcept.nameId : activeConcept.nameEn}
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Reference photo thumb */}
              <div className="bg-[#ECEAE4] border border-neutral-300 rounded-xl p-4">
                <div className="text-xs font-mono text-neutral-500 mb-2">
                  {copy.sec2RefHeading}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: BASELINE_REFERENCE.image,
                        title:
                          lang === "id"
                            ? BASELINE_REFERENCE.nameId
                            : BASELINE_REFERENCE.nameEn,
                      })
                    }
                    className="w-24 aspect-[3/2] rounded-md overflow-hidden border border-neutral-300 shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={BASELINE_REFERENCE.image}
                      alt={BASELINE_REFERENCE.nameId}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {lang === "id"
                      ? BASELINE_REFERENCE.summaryId
                      : BASELINE_REFERENCE.summaryEn}
                  </p>
                </div>
              </div>

              {/* Concrete Design Deltas */}
              <div className="bg-white border border-neutral-300 rounded-xl p-5">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                  {copy.sec2ChangesHeading}
                </h3>
                <ul className="space-y-3 text-sm text-neutral-700 leading-relaxed">
                  {(lang === "id"
                    ? activeConcept.deltasFromReferenceId
                    : activeConcept.deltasFromReferenceEn
                  ).map((delta, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-xs text-amber-700 font-semibold pt-0.5 tabular-nums shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{delta}</span>
                    </li>
                  ))}
                </ul>

                {/* Quick numerical geometry strip */}
                <div className="mt-5 pt-4 border-t border-neutral-200 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-neutral-500">
                      {lang === "id" ? "Tinggi Jok" : "Seat"}
                    </div>
                    <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                      {activeConcept.specs.seatHeightMm} mm
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Clearance</div>
                    <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                      {activeConcept.specs.groundClearanceMm} mm
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500">
                      {lang === "id" ? "Bobot Basah" : "Wet Weight"}
                    </div>
                    <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                      ~{activeConcept.specs.weightEstimateKg} kg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Matrix (Stock GSX-S150 vs Vintage Dirt Bike) */}
        <section id="spesifikasi" className="max-w-7xl mx-auto px-6 py-14 border-b border-neutral-300">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              {copy.sec3Title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {copy.sec3Sub}
            </p>
          </div>

          <div className="overflow-x-auto bg-white border border-neutral-300 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-300 bg-[#ECEAE4] text-xs text-neutral-600">
                  <th className="py-3.5 px-5 font-semibold">{copy.colParam}</th>
                  <th className="py-3.5 px-5 font-semibold">{copy.colStock}</th>
                  <th className="py-3.5 px-5 font-semibold">{copy.colDirt}</th>
                  <th className="py-3.5 px-5 font-semibold">{copy.colNote}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {STOCK_VS_DIRT_MATRIX.map((row, index) => (
                  <tr key={index} className="hover:bg-[#F6F5F2]/70 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-neutral-900 whitespace-nowrap">
                      {lang === "id" ? row.parameterId : row.parameterEn}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-xs text-neutral-600 tabular-nums">
                      {row.stockGsx}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-xs font-semibold text-amber-800 tabular-nums">
                      {row.vintageDirt}
                    </td>
                    <td className="py-3.5 px-5 text-neutral-700">
                      {lang === "id" ? row.noteId : row.noteEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Interactive Gemini Fabrication & Cost Blueprint Advisor */}
        <section id="konsultasi" className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
              {copy.sec4Title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {copy.sec4Sub}
            </p>
          </div>

          <BuildAdvisorPanel selectedConceptId={activeConcept.id} lang={lang} />
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-neutral-300 bg-[#ECEAE4]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-bold text-neutral-900">
              Karsa Dirtworks
            </span>
            <span aria-hidden="true">·</span>
            <span>{copy.footerNote}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#konsep" className="hover:text-neutral-900 transition-colors">
              {copy.navConcepts}
            </a>
            <a href="#komparasi" className="hover:text-neutral-900 transition-colors">
              {copy.navCompare}
            </a>
            <a href="#spesifikasi" className="hover:text-neutral-900 transition-colors">
              {copy.navSpecs}
            </a>
            <a href="#konsultasi" className="hover:text-neutral-900 transition-colors">
              {copy.navAdvisor}
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 text-white">
              <span className="font-display text-lg font-bold tracking-tight">
                {lightboxImage.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close"
                className="p-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[3/2] w-full bg-black">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
