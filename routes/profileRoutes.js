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

// CREATE a new profile
router.post("/", protect, upload.single("image"), createProfile)

// GET the logged-in user's profile
router.get("/me", protect, getMyProfile)

// UPDATE logged-in user's profile
router.put("/me", protect, upload.single("image"), updateProfile)

// GET all approved profiles (public)
router.get("/approved", getApprovedProfiles)

// ADMIN: update profile status
router.put("/:id/status", protect, adminOnly, updateProfileStatus)

export default router
