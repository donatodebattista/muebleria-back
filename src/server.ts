import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import cors from 'cors'
import { corsConfig } from './config/cors'

connectDB()
const app = express()

//CORS
app.use(cors(corsConfig))

//Habilitar lectura de datos de form
app.use(express.json())

app.use('/', router)

export default app