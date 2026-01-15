import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import interestRoutes from "./routes/intrestRoutes.js"
dotenv.config()

const app = express()

app.use(cors({
  origin: [
    'https://trae-dating-project.vercel.app', 
    'http://localhost:5173'                   // local dev
  ],
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/profiles", profileRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api/interests", interestRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)


// Optional: test route
app.get("/", (req, res) => res.send("Backend is live"))

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
