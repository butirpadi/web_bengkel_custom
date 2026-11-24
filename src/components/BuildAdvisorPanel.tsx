import React, { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { REDESIGN_CONCEPTS, type Language } from "../data/concepts";

interface BlueprintResponse {
  buildTitle: string;
  ergonomicsSummary: string;
  gearingAndChassis: {
    frontWheel: string;
    rearWheel: string;
    sprocketRatio: string;
    frontForkSetup: string;
    rearShockSetup: string;
    estimatedGroundClearance: string;
  };
  partsBreakdown: {
    category: string;
    specification: string;
    estimatedCostIdr: string;
  }[];
  gsxTechnicalWarnings: string[];
  fabricationSteps: string[];
  totalEstimatedCostIdr: string;
  estimatedBuildWeeks: string;
}

interface BuildAdvisorPanelProps {
  selectedConceptId: string;
  lang: Language;
}

export const BuildAdvisorPanel: React.FC<BuildAdvisorPanelProps> = ({
  selectedConceptId,
  lang,
}) => {
  const [conceptName, setConceptName] = useState<string>(
    REDESIGN_CONCEPTS.find((c) => c.id === selectedConceptId)?.nameId ??
      REDESIGN_CONCEPTS[0].nameId
  );
  const [donorYear, setDonorYear] = useState("2019 Suzuki GSX-S150");
  const [terrain, setTerrain] = useState(
    lang === "id" ? "Enduro Hutan & Jalur Tanah" : "Forest Enduro & Dirt Singletrack"
  );
  const [riderHeightCm, setRiderHeightCm] = useState(172);
  const [budgetTier, setBudgetTier] = useState("Rp 18 – 26 Juta");
  const [customNotes, setCustomNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<BlueprintResponse | null>(null);

  React.useEffect(() => {
    const found = REDESIGN_CONCEPTS.find((c) => c.id === selectedConceptId);
    if (found) {
      setConceptName(lang === "id" ? found.nameId : found.nameEn);
    }
  }, [selectedConceptId, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/build-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conceptName,
          donorYear,
          terrain,
          riderHeightCm,
          budgetTier,
          language: lang,
          customNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || `Server error (${res.status})`);
      }
      setBlueprint(data as BlueprintResponse);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyusun blueprint.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!blueprint) return;
    const lines = [
      `# ${blueprint.buildTitle}`,
      `Basis Donor: ${donorYear} | Target Konsep: ${conceptName}`,
      `Estimasi Total Biaya Modifikasi: ${blueprint.totalEstimatedCostIdr} (${blueprint.estimatedBuildWeeks})`,
      "",
      "## Ergonomi & Posisi Berkendara",
      blueprint.ergonomicsSummary,
      "",
      "## Setup Kaki-kaki & Rasio",
      `- Roda Depan: ${blueprint.gearingAndChassis.frontWheel}`,
      `- Roda Belakang: ${blueprint.gearingAndChassis.rearWheel}`,
      `- Rasio Gir: ${blueprint.gearingAndChassis.sprocketRatio}`,
      `- Suspensi Depan: ${blueprint.gearingAndChassis.frontForkSetup}`,
      `- Suspensi Belakang: ${blueprint.gearingAndChassis.rearShockSetup}`,
      `- Ground Clearance: ${blueprint.gearingAndChassis.estimatedGroundClearance}`,
      "",
      "## Rincian Komponen & Estimasi Biaya",
      ...blueprint.partsBreakdown.map(
        (p) => `- **${p.category}**: ${p.specification} (${p.estimatedCostIdr})`
      ),
      "",
      "## Catatan Teknis Donor GSX-S150",
      ...blueprint.gsxTechnicalWarnings.map((w) => `- ${w}`),
      "",
      "## Urutan Fabrikasi Bengkel",
      ...blueprint.fabricationSteps.map((s, idx) => `${idx + 1}. ${s}`),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blueprint-gsx-s150-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5 bg-[#ECEAE4] border border-neutral-300 rounded-xl p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="concept-select"
            className="block text-xs font-medium text-neutral-700 mb-1.5"
          >
            {lang === "id" ? "Konsep Desain Acuan" : "Target Redesign Concept"}
          </label>
          <select
            id="concept-select"
            value={conceptName}
            onChange={(e) => setConceptName(e.target.value)}
            className="w-full h-11 px-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-2 focus:outline-amber-600"
          >
            {REDESIGN_CONCEPTS.map((c) => {
              const label = lang === "id" ? c.nameId : c.nameEn;
              return (
                <option key={c.id} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="donor-year"
              className="block text-xs font-medium text-neutral-700 mb-1.5"
            >
              {lang === "id" ? "Tahun Motor Donor" : "Donor Bike Year"}
            </label>
            <select
              id="donor-year"
              value={donorYear}
              onChange={(e) => setDonorYear(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-2 focus:outline-amber-600"
            >
              <option value="2017 Suzuki GSX-S150 (Keyless)">2017 GSX-S150</option>
              <option value="2018 Suzuki GSX-S150">2018 GSX-S150</option>
              <option value="2019 Suzuki GSX-S150">2019 GSX-S150</option>
              <option value="2020-2022 Suzuki GSX-S150">2020–2022 GSX-S150</option>
              <option value="2023-2024 Suzuki GSX-S150">2023–2024 GSX-S150</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="rider-height"
              className="block text-xs font-medium text-neutral-700 mb-1.5"
            >
              {lang === "id" ? "Tinggi Pengendara (cm)" : "Rider Height (cm)"}
            </label>
            <input
              id="rider-height"
              type="number"
              min={150}
              max={200}
              value={riderHeightCm}
              onChange={(e) => setRiderHeightCm(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-neutral-300 bg-white text-sm font-mono tabular-nums text-neutral-900 focus:outline-2 focus:outline-amber-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="terrain-select"
              className="block text-xs font-medium text-neutral-700 mb-1.5"
            >
              {lang === "id" ? "Karakter Medan Utama" : "Primary Terrain"}
            </label>
            <select
              id="terrain-select"
              value={terrain}
              onChange={(e) => setTerrain(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-2 focus:outline-amber-600"
            >
              <option value="Enduro Hutan & Jalur Tanah">
                {lang === "id" ? "Enduro Hutan & Tanah" : "Forest Enduro & Dirt"}
              </option>
              <option value="Gravel Cepat & Jalan Rusak">
                {lang === "id" ? "Gravel Cepat & Pasir" : "Fast Gravel & Sand"}
              </option>
              <option value="Dual-Purpose Harian + Trabas Ringan">
                {lang === "id" ? "Harian + Trabas Ringan" : "Daily + Light Trail"}
              </option>
              <option value="Ekspedisi Rally Jarak Jauh">
                {lang === "id" ? "Ekspedisi Jarak Jauh" : "Long-Range Expedition"}
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="budget-select"
              className="block text-xs font-medium text-neutral-700 mb-1.5"
            >
              {lang === "id" ? "Alokasi Budget Modif" : "Modification Budget"}
            </label>
            <select
              id="budget-select"
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-2 focus:outline-amber-600"
            >
              <option value="Rp 12 – 18 Juta (Konversi Efisien)">
                Rp 12 – 18 Juta
              </option>
              <option value="Rp 18 – 26 Juta (Custom Bengkel Standar)">
                Rp 18 – 26 Juta
              </option>
              <option value="Rp 26 – 38 Juta (Full Alloy & Suspensi Pro)">
                Rp 26 – 38 Juta
              </option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="custom-notes"
            className="block text-xs font-medium text-neutral-700 mb-1.5"
          >
            {lang === "id" ? "Catatan Tambahan (Opsional)" : "Builder Notes (Optional)"}
          </label>
          <textarea
            id="custom-notes"
            rows={3}
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder={
              lang === "id"
                ? "Contoh: Pertahankan spidometer ori, mau tetap legal lampu sein & pelat nomor untuk harian."
                : "Example: Keep stock digital cluster, must remain street-legal with turn signals."
            }
            className="w-full p-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-2 focus:outline-amber-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 px-5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-amber-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>
                {lang === "id" ? "Menyusun Blueprint..." : "Generating Blueprint..."}
              </span>
            </>
          ) : (
            <span>
              {lang === "id"
                ? "Buat Blueprint & Estimasi RAB"
                : "Generate Fabrication Blueprint"}
            </span>
          )}
        </button>
      </form>

      {/* Output Pane */}
      <div className="lg:col-span-7 bg-white border border-neutral-300 rounded-xl p-6 min-h-[420px]">
        {errorMsg && (
          <div
            role="alert"
            className="p-4 rounded-lg border border-red-300 bg-red-50 text-red-900 text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-red-700 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">
                {lang === "id" ? "Permintaan Gagal" : "Request Failed"}
              </div>
              <p className="text-red-800">{errorMsg}</p>
            </div>
          </div>
        )}

        {!blueprint && !loading && !errorMsg && (
          <div className="h-full flex flex-col justify-center py-12 text-neutral-600 space-y-4">
            <h3 className="font-display text-2xl font-bold text-neutral-900">
              {lang === "id"
                ? "Kalkulator Fabrikasi & Rincian Teknis GSX-S150"
                : "GSX-S150 Fabrication & Cost Blueprint"}
            </h3>
            <p className="text-sm leading-relaxed max-w-xl">
              {lang === "id"
                ? "Pilih gaya vintage dirt bike, tinggi pengendara, serta alokasi dana di panel kiri. Sistem akan menyusun daftar komponen kompatibel, rasio gir, penyesuaian pompa injeksi tangki custom, serta urutan pengerjaan bengkel."
                : "Select your target vintage dirt bike style, rider height, and budget on the left to generate a parts list, gearing recommendation, EFI tank adaptation notes, and workshop sequence."}
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-200 text-xs text-neutral-600">
              <div>
                <div className="font-mono font-semibold text-neutral-900 mb-1">01. EFI Pump</div>
                {lang === "id"
                  ? "Adaptasi flange tangki ori ke tangki vintage."
                  : "OEM fuel pump flange relocation into custom tank."}
              </div>
              <div>
                <div className="font-mono font-semibold text-neutral-900 mb-1">02. Subframe</div>
                {lang === "id"
                  ? "Pemotongan & pengelasan ulang buritan datar."
                  : "Rear loop cut & TIG-welded dirt-track tail."}
              </div>
              <div>
                <div className="font-mono font-semibold text-neutral-900 mb-1">03. 21&quot; / 18&quot;</div>
                {lang === "id"
                  ? "Kompensasi tromol jari-jari & rasio gir."
                  : "Spoke hub spacing & final-drive ratio."}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="h-full flex flex-col items-center justify-center py-16 text-neutral-600 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-amber-700" />
            <p className="text-sm font-medium">
              {lang === "id"
                ? "Menghitung geometri rangka, rasio gir, dan rincian biaya..."
                : "Calculating chassis geometry, gearing, and itemized costs..."}
            </p>
          </div>
        )}

        {blueprint && !loading && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <div className="text-xs font-mono text-amber-800 mb-1">
                  {blueprint.estimatedBuildWeeks} · {blueprint.totalEstimatedCostIdr}
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-900">
                  {blueprint.buildTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="px-3.5 py-2 text-xs font-medium border border-neutral-300 rounded-lg hover:bg-neutral-100 text-neutral-900 flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === "id" ? "Unduh (.md)" : "Export (.md)"}</span>
              </button>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              {blueprint.ergonomicsSummary}
            </p>

            {/* Chassis & Gearing summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#F6F5F2] border border-neutral-200 text-xs">
              <div>
                <div className="text-neutral-500 mb-0.5">
                  {lang === "id" ? "Roda Depan" : "Front Wheel"}
                </div>
                <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                  {blueprint.gearingAndChassis.frontWheel}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 mb-0.5">
                  {lang === "id" ? "Roda Belakang" : "Rear Wheel"}
                </div>
                <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                  {blueprint.gearingAndChassis.rearWheel}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 mb-0.5">
                  {lang === "id" ? "Rasio Gir" : "Sprocket"}
                </div>
                <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                  {blueprint.gearingAndChassis.sprocketRatio}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 mb-0.5">
                  {lang === "id" ? "Sok Depan" : "Front Fork"}
                </div>
                <div className="font-mono font-semibold text-neutral-900">
                  {blueprint.gearingAndChassis.frontForkSetup}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 mb-0.5">
                  {lang === "id" ? "Monoshock" : "Rear Shock"}
                </div>
                <div className="font-mono font-semibold text-neutral-900">
                  {blueprint.gearingAndChassis.rearShockSetup}
                </div>
              </div>
              <div>
                <div className="text-neutral-500 mb-0.5">Ground Clearance</div>
                <div className="font-mono font-semibold text-neutral-900 tabular-nums">
                  {blueprint.gearingAndChassis.estimatedGroundClearance}
                </div>
              </div>
            </div>

            {/* Parts breakdown table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-300 text-xs text-neutral-500">
                    <th className="py-2 pr-3 font-medium">
                      {lang === "id" ? "Komponen" : "Category"}
                    </th>
                    <th className="py-2 px-3 font-medium">
                      {lang === "id" ? "Spesifikasi" : "Specification"}
                    </th>
                    <th className="py-2 pl-3 font-medium text-right">
                      {lang === "id" ? "Estimasi" : "Est. Cost"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {blueprint.partsBreakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-3 font-medium text-neutral-900 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="py-2.5 px-3 text-neutral-700">
                        {item.specification}
                      </td>
                      <td className="py-2.5 pl-3 text-right font-mono text-xs tabular-nums text-neutral-900 whitespace-nowrap">
                        {item.estimatedCostIdr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warnings & Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-neutral-200">
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 mb-2">
                  {lang === "id"
                    ? "Catatan Teknis Donor GSX-S150"
                    : "GSX-S150 Donor Warnings"}
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed">
                  {blueprint.gsxTechnicalWarnings.map((warn, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-amber-700 shrink-0">!</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-neutral-900 mb-2">
                  {lang === "id" ? "Urutan Kerja Bengkel" : "Workshop Build Sequence"}
                </h4>
                <ol className="space-y-2 text-xs text-neutral-700 leading-relaxed">
                  {blueprint.fabricationSteps.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-neutral-500 tabular-nums shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
