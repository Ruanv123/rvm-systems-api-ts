import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)


const port = process.env.PORT || 3054
app.listen(port, () => {
  console.log(`server rodando na porta ${port} 🚀`)
})