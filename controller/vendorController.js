import Vendor from "../model/Vendors.js";



export const getVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });

    res.json(vendors);
  } catch (err) {
    console.error("Error loading vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const addVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    const vendor = await Vendor.create({ name, email, phone });

    res.status(201).json({ success: true, vendor });
  } catch (err) {
    console.error("Error adding vendor:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting vendor:", err);
    res.status(500).json({ error: "Server error" });
  }
}