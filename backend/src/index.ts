import 'dotenv/config'
import express, { Express } from 'express'
import cors from 'cors'
import { assistantRoutes, clientRoutes } from './routes'

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/assistant', assistantRoutes)
app.use('/api/client', clientRoutes)

app.listen(1234, () => {
  console.log('Example app listening on port 1234!')
})