import { Response, Request } from 'express'
import { assistantService } from '../services'

const getAll = async (req: Request, res: Response) => {
  const allAssistants = await assistantService.getAll()
  res.send({ status: 'OK', rows: allAssistants })
}

const createAssistant = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body
  await assistantService.createAssistant(nome, email, telefone)
  res.send({ status: 'OK' })
}

export default {
  getAll,
  createAssistant
}