import { Response, Request } from 'express'
import { clientService } from '../services'

const getUnassignedClients = async (req: Request, res: Response) => {
  const allUnassignedClients = await clientService.getUnassignedClients()
  res.send({ status: 'OK', rows: allUnassignedClients })
}

const getAssignedClientsById = async (req: Request, res: Response) => {
  const { id } = req.params
  const allAssignedClients = await clientService.getAssignedClientsById(Number(id))
  res.send({ status: 'OK', rows: allAssignedClients })
}

const unassignClients = async (req: Request, res: Response) => {
  const { clientIds } = req.body
  await clientService.unassignClients(clientIds)
  res.send({ status: 'OK' })
}

const assignClients = async (req: Request, res: Response) => {
  const { clientIds, idAssistente } = req.body
  await clientService.assignClients(clientIds, idAssistente)
  res.send({ status: 'OK' })
}

const createClient = async (req: Request, res: Response) => {
  const { codigo, nome, rede } = req.body
  await clientService.createClient(codigo, nome, rede)
  res.send({ status: 'OK' })
}

export default {
  getUnassignedClients,
  getAssignedClientsById,
  unassignClients,
  assignClients,
  createClient
}