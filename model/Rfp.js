import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  specs: String,
});

// EACH VENDOR RESPONSE
const vendorResponseSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  quotedAmount: Number,
  deliveryDays: Number,
  warrantyMonths: Number,
  notes: String,
  attachments: [String],
  status: { 
    type: String, 
    enum: ["Pending", "Submitted", "Rejected"], 
    default: "Pending" 
  },
  submittedAt: Date
});

const rfpSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    budget: Number,
    deliveryDays: Number,
    paymentTerms: String,
    warrantyMonths: Number,
    items: [itemSchema],

    // VENDORS ASSIGNED TO THIS RFP
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],

    // VENDOR RESPONSES  
    vendorResponses: [vendorResponseSchema],

    // FINAL DECISION  
    selectedVendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

    status: {
      type: String,
      enum: ["Draft", "Pending", "Sent", "Responses Received", "Completed"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

const Rfp = mongoose.model("Rfp", rfpSchema);
export default Rfp;
