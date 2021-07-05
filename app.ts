import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

import { authRouter } from './routes/auth.routes'



const app = express()

const SERVER_PORT: number = config.get(`SERVER_PORT`) || 4000
const MONGO_URI: string = config.get(`MONGO_URI`)

app.use(express.json())

app.use(`/api/auth`, authRouter)


const start = async () => {
   try {
      await mongoose.connect(MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
   } catch (e) {
      console.log(`Server error: `, e.message)
      process.exit(1)
   }
}

start()

app.listen(SERVER_PORT, () => console.log(`Server port: ${SERVER_PORT}`))