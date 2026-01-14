import express from "express"
import {
  createProfile,
  getMyProfile,
  updateProfile,
  getApprovedProfiles,
  updateProfileStatus
} from "../controllers/profileController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()


router.post("/", protect, upload.single("image"), createProfile)
router.put("/me", protect, upload.single("image"), updateProfile)
router.post("/", protect, createProfile)
router.get("/me", protect, getMyProfile)
router.put("/me", protect, updateProfile)
router.get("/approved", getApprovedProfiles)
router.put("/:id/status", protect, adminOnly, updateProfileStatus)

export default router
