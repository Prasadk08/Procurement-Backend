import express from "express";


const router = express.Router();
import {getRfps,generateRfp,showRfp} from "../controller/rfpController.js"



router.get("/rfps", getRfps)


router.post("/generate-rfp", generateRfp)


router.get("/:id", showRfp)


export default router