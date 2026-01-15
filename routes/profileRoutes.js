import express from "express"
import {
  createProfile,
  getMyProfile,
  updateProfile,
  getApprovedProfiles,
  updateProfileStatus,
  deleteProfile
} from "../controllers/profileController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()

// Create new profile
router.post("/", protect, upload.single("image"), createProfile)

// Get my profile
router.get("/me", protect, getMyProfile)

// Update my profile
router.put("/me", protect, upload.single("image"), updateProfile)

// Delete my profile/account
router.delete("/delete", protect, deleteProfile)

// Get all approved profiles
router.get("/approved", getApprovedProfiles)

// Admin: approve/reject profiles
router.put("/:id/status", protect, adminOnly, updateProfileStatus)

export default router
