import { Response, Request } from 'express'
import { clientService } from '../services'

const getUnassignedClients = async (req: Request, res: Response): Promise<any> => {
  try {
    const allUnassignedClients = await clientService.getUnassignedClients()
    res.status(200).send({ rows: allUnassignedClients })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const getAssignedClientsById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    const allAssignedClients = await clientService.getAssignedClientsById(Number(id))
    res.status(200).send({ rows: allAssignedClients })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const unassignClients = async (req: Request, res: Response): Promise<any> => {
  try {
    const { clientIds } = req.body

    if (!clientIds) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await clientService.unassignClients(clientIds)
    res.status(204).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const assignClients = async (req: Request, res: Response): Promise<any> => {
  try {
    const { clientIds, idAssistente } = req.body

    if (!clientIds || !idAssistente) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await clientService.assignClients(clientIds, idAssistente)
    res.status(204).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const createClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { codigo, nome, rede } = req.body

    if (!codigo || !nome || !rede) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await clientService.createClient(codigo, nome, rede)
    res.status(201).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const deleteClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await clientService.deleteClient(Number(id))
    res.status(204).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

export default {
  getUnassignedClients,
  getAssignedClientsById,
  unassignClients,
  assignClients,
  createClient,
  deleteClient
}