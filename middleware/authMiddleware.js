import jwt from "jsonwebtoken"
import User from "../model/User.js"

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token, authorization denied" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select("-password")
    next()
  } catch {
    res.status(401).json({ message: "Token is not valid" })
  }
}

export default auth

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token" })

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = decoded
  next()
}

export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    if (user.role !== "admin") return res.status(403).json({ message: "Admin access only" })
    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
