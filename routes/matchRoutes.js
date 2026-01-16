import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getMyMatches } from "../controllers/MatchController.js"

const router = express.Router()
router.get("/", protect, getMyMatches)

export default router
