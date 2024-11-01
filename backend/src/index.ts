import 'dotenv/config'
import express, { Express } from 'express'
import cors from 'cors'
import { assistantRoutes, clientRoutes } from './routes'

const app: Express = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/assistant', assistantRoutes)
app.use('/api/client', clientRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})