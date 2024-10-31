import prisma from '../../prisma/prisma'

const getUnassignedClients = async () => {
  const data = await prisma.cliente.findMany({
    where: {
      idAssistente: null
    }
  })
  return data
}

const getAssignedClientsById = async (id: number) => {
  const data = await prisma.cliente.findMany({
    where: {
      idAssistente: id
    }
  })
  return data
}

const assignClients = async (clientIds: number[], idAssistente: number) => {
  const updatePromises = clientIds.map(id => 
    prisma.cliente.update({
      where: { id },
      data: { idAssistente }
    })
  )

  const updatedClients = await Promise.all(updatePromises)
  return updatedClients
}

const unassignClients = async (clientIds: number[]) => {
  const updatePromises = clientIds.map(id => 
    prisma.cliente.update({
      where: { id },
      data: { idAssistente: null }
    })
  )

  const updatedClients = await Promise.all(updatePromises)
  return updatedClients
}

const createClient = async (codigo: string, nome: string, rede: string) => {
  const newClient = await prisma.cliente.create({
    data: {
      codigo,
      nome,
      rede,
      idAssistente: null
    }
  })

  return newClient
}

export default {
  getUnassignedClients,
  getAssignedClientsById,
  unassignClients,
  assignClients,
  createClient
}