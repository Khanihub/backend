import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"

dotenv.config()

const app = express()

// CORS: allow both local dev and production frontend
app.use(cors({
  origin: [
    'https://trae-dating-project.vercel.app', // production frontend
    'http://localhost:5173'                   // local dev
  ],
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/profiles", profileRoutes)
app.use("/uploads", express.static("uploads"))

// Optional: test route
app.get("/", (req, res) => res.send("Backend is live"))

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
