import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { sendInterest, acceptInterest } from "../controllers/InterestController.js"

const router = express.Router()

router.post("/", protect, sendInterest)
router.put("/:id/accept", protect, acceptInterest)

export default router
