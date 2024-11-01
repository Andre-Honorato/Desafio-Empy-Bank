import { Response, Request } from 'express'
import { assistantService } from '../services'

const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const allAssistants = await assistantService.getAll()
    res.status(200).send({ rows: allAssistants })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const createAssistant = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nome, email, telefone } = req.body

    if (!nome || !email || !telefone) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await assistantService.createAssistant(nome, email, telefone)
    res.status(201).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

const deleteAssistant = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ error: 'Missing fields' })
    }

    await assistantService.deleteAssistant(Number(id))
    res.status(204).send({ status: 'OK' })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

export default {
  getAll,
  createAssistant,
  deleteAssistant
}