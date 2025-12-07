import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  notes: String
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;