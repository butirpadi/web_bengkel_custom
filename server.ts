import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

interface AdvisorRequestBody {
  conceptName?: string;
  donorYear?: string;
  terrain?: string;
  riderHeightCm?: number;
  budgetTier?: string;
  language?: "id" | "en";
  customNotes?: string;
}

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum dikonfigurasi pada environment server.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.post("/api/build-advisor", async (req, res) => {
    try {
      const body = (req.body || {}) as AdvisorRequestBody;
      const conceptName = String(body.conceptName || "1978 RM-150 Heritage Enduro").slice(0, 120);
      const donorYear = String(body.donorYear || "2019 Suzuki GSX-S150").slice(0, 80);
      const terrain = String(body.terrain || "Enduro Hutan & Jalur Tanah").slice(0, 100);
      const riderHeightCm = Math.min(210, Math.max(145, Number(body.riderHeightCm) || 172));
      const budgetTier = String(body.budgetTier || "Rp 18 – 26 Juta").slice(0, 80);
      const lang = body.language === "en" ? "English" : "Bahasa Indonesia";
      const customNotes = String(body.customNotes || "").slice(0, 500);

      const ai = getAiClient();

      const prompt = [
        `You are a senior custom motorcycle frame fabricator and Suzuki specialist in Indonesia.`,
        `Generate a practical, mechanically accurate Vintage Dirt Bike conversion blueprint based on a donor "${donorYear}".`,
        `Target Concept: ${conceptName}`,
        `Primary Terrain: ${terrain}`,
        `Rider Height: ${riderHeightCm} cm`,
        `Target Build Budget (excluding donor bike): ${budgetTier}`,
        customNotes ? `Builder Notes: ${customNotes}` : "",
        `Respond strictly in ${lang}.`,
        `Keep every mechanical detail authentic to the Suzuki GSX-S150 (147.3cc DOHC 4-valve liquid-cooled engine, twin-spar diamond steel frame, 1300mm stock wheelbase, in-tank EFI fuel pump, underbelly radiator, 17-inch cast wheels).`,
        `Include realistic Indonesian workshop pricing (in IDR), exact sprocket ratio recommendations, suspension & subframe modifications, EFI fuel pump relocation advice for custom vintage tanks, and step-by-step fabrication sequence.`,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              buildTitle: {
                type: Type.STRING,
                description: "Concise build project name",
              },
              ergonomicsSummary: {
                type: Type.STRING,
                description: "Recommended seat height (mm), handlebar rise, and rider triangle fit for the rider height",
              },
              gearingAndChassis: {
                type: Type.OBJECT,
                properties: {
                  frontWheel: { type: Type.STRING },
                  rearWheel: { type: Type.STRING },
                  sprocketRatio: { type: Type.STRING },
                  frontForkSetup: { type: Type.STRING },
                  rearShockSetup: { type: Type.STRING },
                  estimatedGroundClearance: { type: Type.STRING },
                },
                required: [
                  "frontWheel",
                  "rearWheel",
                  "sprocketRatio",
                  "frontForkSetup",
                  "rearShockSetup",
                  "estimatedGroundClearance",
                ],
              },
              partsBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    specification: { type: Type.STRING },
                    estimatedCostIdr: { type: Type.STRING },
                  },
                  required: ["category", "specification", "estimatedCostIdr"],
                },
              },
              gsxTechnicalWarnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-4 critical GSX-S150 donor conversion notes (EFI fuel pump, radiator fan, sensor wiring, chain line)",
              },
              fabricationSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "5 sequential workshop build steps from strip-down to trail shakedown",
              },
              totalEstimatedCostIdr: { type: Type.STRING },
              estimatedBuildWeeks: { type: Type.STRING },
            },
            required: [
              "buildTitle",
              "ergonomicsSummary",
              "gearingAndChassis",
              "partsBreakdown",
              "gsxTechnicalWarnings",
              "fabricationSteps",
              "totalEstimatedCostIdr",
              "estimatedBuildWeeks",
            ],
          },
        },
      });

      const rawText = (response.text ?? "{}").trim();
      const parsed = JSON.parse(rawText);
      return res.json(parsed);
    } catch (error) {
      const err = error as { message?: string; status?: number };
      const status = typeof err.status === "number" && err.status >= 400 ? err.status : 500;
      return res.status(status).json({
        error: err.message || "Gagal menghasilkan blueprint modifikasi dari server.",
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
