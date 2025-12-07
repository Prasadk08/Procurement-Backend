import express from "express"
const router = express.Router()

import {proposalResponse,proposalSend} from "../controller/proposalController.js"


router.post("/:id/send", proposalSend)

router.post("/:rfpId/:vendorId/submit",proposalResponse)

export default router