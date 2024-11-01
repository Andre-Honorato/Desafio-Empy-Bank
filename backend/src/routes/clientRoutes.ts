import express from 'express'
import { clientController } from '../controllers'

const router = express.Router()

router.get('/getUnassignedClients', clientController.getUnassignedClients)
router.get('/getAssignedClientsById/:id', clientController.getAssignedClientsById)
router.post('/assignClients', clientController.assignClients)
router.post('/unassignClients', clientController.unassignClients)
router.post('/createClient', clientController.createClient)
router.delete('/deleteClient', clientController.deleteClient)

export default router