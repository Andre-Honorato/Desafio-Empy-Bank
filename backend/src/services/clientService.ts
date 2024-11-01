import prisma from '../../prisma/prisma'

const getUnassignedClients = async () => {
  try {
    const data = await prisma.cliente.findMany({
      where: {
        idAssistente: null
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const getAssignedClientsById = async (id: number) => {
  try {
    const data = await prisma.cliente.findMany({
      where: {
        idAssistente: id
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const assignClients = async (clientIds: number[], idAssistente: number) => {
  try {
    const updatePromises = clientIds.map(id => 
      prisma.cliente.update({
        where: { id },
        data: { idAssistente }
      })
    )
  
    const updatedClients = await Promise.all(updatePromises)
    return updatedClients
  } catch (error) {
    throw error
  }
}

const unassignClients = async (clientIds: number[]) => {
  try {
    const updatePromises = clientIds.map(id => 
      prisma.cliente.update({
        where: { id },
        data: { idAssistente: null }
      })
    )
  
    const updatedClients = await Promise.all(updatePromises)
    return updatedClients
  } catch (error) {
    throw error
  }
}

const createClient = async (codigo: string, nome: string, rede: string) => {
  try {
    const newClient = await prisma.cliente.create({
      data: {
        codigo,
        nome,
        rede,
        idAssistente: null
      }
    })
    return newClient
  } catch (error) {
    throw error
  }
}

const deleteClient = async (id: number) => {
  try {
    const deletedClient = await prisma.cliente.delete({
      where: { id }
    })
    return deletedClient
  } catch (error) {
    throw error
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