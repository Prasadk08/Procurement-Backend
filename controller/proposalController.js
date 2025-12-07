import Vendor from "../model/Vendors.js";
import Rfp from "../model/Rfp.js";
import proposalPrompt from "../Ai-prompt/proposalPrompt.js";
import model from "../Ai-Agent/gemini.js";
import transporter from "../Node-mailer/mailer.js";

export const proposalSend = async (req, res) => {
  try {
    const { vendors } = req.body;
    const FRONTEND_URL = "http://localhost:3000";

    console.log("Request is comming")

    const rfp = await Rfp.findById(req.params.id).populate("vendors");
    if (!rfp) return res.status(404).json({ error: "RFP not found" });

    const vendorDocs = await Vendor.find({ _id: { $in: vendors } });

    //AI PROMPT
    let aiPrompt = proposalPrompt(rfp);

    console.log("Check ",aiPrompt)

    const response = await model.invoke(aiPrompt);
    const aiEmailBody = response.content;
    console.log("check 2 ",aiEmailBody)

    // Send email to each vendor
    for (const vendor of vendorDocs) {
      const vendorLink = `${FRONTEND_URL}/vendor/${rfp._id}/${vendor._id}`;

      const finalEmail = `
Hello ${vendor.name},

${aiEmailBody}

----------------------------------------
Submit Your Proposal:
${vendorLink}
----------------------------------------

Thank you,
Procurement Team
`;

      await transporter.sendMail({
        from: '"Procurement Team" <kshirsagarprasad025@gmail.com>',
        to: vendor.email,
        subject: `New RFP: ${rfp.title}`,
        text: finalEmail,
      });
    }

    rfp.vendors = vendors;
    rfp.status = "Sent";
    await rfp.save();

    res.json({ message: "RFP sent to vendors", rfp });
  } catch (err) {
    console.error("Failed to for proposal ",err);
    res.status(500).json({ error: `Failed to send RFP ${err}`});
  }
};

export const proposalResponse = async (req, res) => {
  try {
    const { rfpId, vendorId } = req.params;
    const { quotedAmount, deliveryDays, warrantyMonths, notes } = req.body;

    const rfp = await Rfp.findById(rfpId);
    if (!rfp) return res.status(404).json({ error: "RFP not found" });

    // check vendor belongs to RFP vendors
    if (!rfp.vendors.includes(vendorId)) {
      return res
        .status(400)
        .json({ error: "Vendor is not assigned to this RFP" });
    }

    // Add vendor response
    rfp.vendorResponses.push({
      vendor: vendorId,
      quotedAmount,
      deliveryDays,
      warrantyMonths,
      notes,
      status: "Submitted",
      submittedAt: new Date(),
    });

    rfp.status = "Responses Received";

    await rfp.save();

    res.json({ message: "Response submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
