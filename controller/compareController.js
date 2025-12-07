import Rfp from "../model/Rfp.js";

import comparePrompt from "../Ai-prompt/comparePrompt.js";
import model from "../Ai-Agent/gemini.js";

export const aiCompare = async (req, res) => {
  try {
    const rfp = await Rfp.findById(req.params.id).populate(
      "vendorResponses.vendor"
    );

    if (!rfp) {
      return res.status(404).json({ error: "RFP not found" });
    }

    const vendors = rfp.vendorResponses.map((v) => ({
      vendor: v.vendor?.name || "Unknown Vendor",
      price: v.quotedAmount,
      deliveryDays: v.deliveryDays,
      warrantyMonths: v.warrantyMonths,
    }));

    // Ai- prompt
    let prompt = comparePrompt(vendors, rfp);

    // ==== Gemini request ====
    const response = await model.invoke(prompt);

    // Extract the pure text
    const content = Array.isArray(response.content)
      ? response.content[0].text.trim()
      : response.content.trim();

    // SAFE JSON EXTRACTOR
    let cleaned = content.trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Gemini output did not contain JSON object");
    }

    cleaned = cleaned.substring(firstBrace, lastBrace + 1);

    const analysis = JSON.parse(cleaned);

    res.json({
      comparisons: analysis.comparisons,
      bestVendor: analysis.bestVendor,
    });

    // res.json({ vendors: analysis });
  } catch (err) {
    console.error("AI compare error:", err.message);
    res.status(500).json({ error: "AI evaluation failed" });
  }
};
