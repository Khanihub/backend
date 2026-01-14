import express from "express"
import { register, login, changeEmail, changePassword, protect  } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.put("/change-email", protect, changeEmail)
router.put("/change-password", protect, changePassword)

export default router
