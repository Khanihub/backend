import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors({
  origin: ['https://trae-dating-project.vercel.app', // production frontend
    'http://localhost:5173'],
  credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoutes)

export default app
