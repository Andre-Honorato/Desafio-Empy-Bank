import express from 'express'
import { assistantController } from '../controllers'

const router = express.Router()

router.get('/getAll', assistantController.getAll)
router.post('/createAssistant', assistantController.createAssistant)
router.delete('/deleteAssistant', assistantController.deleteAssistant)

export default router