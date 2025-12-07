import express from "express"
const router = express.Router()



import {getVendor,addVendor,deleteVendor} from "../controller/vendorController.js"


router.get("/getvendor", getVendor)


router.post("/add-vendor", addVendor)


router.delete("/:id", deleteVendor)


export default router