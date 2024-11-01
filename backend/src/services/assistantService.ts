import prisma from '../../prisma/prisma'

const getAll = async () => {
  const data = await prisma.assistenteComercial.findMany()
  return data
}

const createAssistant = async (nome: string, email: string, telefone: string) => {
  const newAssistente = await prisma.assistenteComercial.create({
    data: {
      nome,
      email,
      telefone
    }
  })
  return newAssistente
}

const deleteAssistant = async (id: number) => {
  try {
    const deletedAssistente = await prisma.assistenteComercial.delete({
      where: { id }
    })
    return deletedAssistente
  } catch (error) {
    throw error
  }
}

export default {
  getAll,
  createAssistant,
  deleteAssistant
}