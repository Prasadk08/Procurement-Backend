import Rfp from "../model/Rfp.js";

import msg from "../Ai-prompt/rfpGenerate.js"
import model from "../Ai-Agent/gemini.js";



export const getRfps = async (req, res) => {
  try {
    const rfps = await Rfp.find().sort({ createdAt: -1 }).select("title budget status createdAt");
    res.json(rfps);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}


export const generateRfp = async (req, res) => {
  try {
    let systemMsg = msg(req);
    const response = await model.invoke(systemMsg);

    let clean = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiObj;
    try {
      aiObj = JSON.parse(clean);
    } catch (err) {
      return res.status(400).json({
        error: "AI did not return valid JSON",
      });
    }

    if (aiObj && aiObj.error) {
      return res.status(400).json(response);
    }

    // Validate AI returned object
    const requiredKeys = [
      "title",
      "description",
      "budget",
      "deliveryDays",
      "paymentTerms",
      "warrantyMonths",
      "items",
    ];
    const missing = requiredKeys.filter((k) => !(k in aiObj));
    if (missing.length > 0) {
      return res.status(400).json({ error: "Insufficient data to create RFP" });
    }

    // Apply user overrides if provided (user should be authoritative)
    if (typeof deliveryDays === "number" && !Number.isNaN(deliveryDays)) {
      aiObj.deliveryDays = deliveryDays;
    }
    if (typeof warrantyMonths === "number" && !Number.isNaN(warrantyMonths)) {
      aiObj.warrantyMonths = warrantyMonths;
    }

    // Ensure vendors and status fields
    aiObj.vendors = Array.isArray(aiObj.vendors) ? aiObj.vendors : [];
    aiObj.status = aiObj.status || "Pending";

    // Save to MongoDB
    const rfpDoc = new Rfp(aiObj);
    await rfpDoc.save()


    return res.status(201).json(rfpDoc);
  } catch (e) {
    console.log(e);
  }
}


export const showRfp = async (req, res) => {
  try {
    const rfp = await Rfp.findById(req.params.id)
      .populate("vendors")
      .populate("vendorResponses.vendor");

    if (!rfp) {
      return res.status(404).json({ error: "RFP not found" });
    }

    return res.json(rfp);

  } catch (error) {
    console.error("Error fetching RFP:", error);
    res.status(500).json({ error: "Server error while fetching RFP" });
  }
}