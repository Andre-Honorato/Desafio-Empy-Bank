import express from 'express'
import { assistantController } from '../controllers'

const router = express.Router()

router.get('/getAll', assistantController.getAll)
router.post('/createAssistant', assistantController.createAssistant)

export default router