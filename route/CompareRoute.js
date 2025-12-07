import express from "express"
const router = express.Router()


import {aiCompare} from "../controller/compareController.js"

router.get("/:id/ai-compare", aiCompare)

export default router