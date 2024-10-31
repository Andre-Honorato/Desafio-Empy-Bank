import { SideBar } from './components/SideBar/SideBar'
import {
  PiCaretDown,
  PiPlusCircle,
  PiArrowCircleRight,
  PiArrowCircleLeft,
} from 'react-icons/pi'
import { Card } from './components/Card'
import { Modal } from './components/Modal/Modal'
import { useEffect, useState, useCallback } from 'react'
import api from './services/api'
import { Assistant, Client } from './types/types'

export function App() {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [unassignedClients, setUnassignedClients] = useState([])
  const [assignedClients, setAssignedClients] = useState([])
  const [unassignedClientsFilter, setUnassignedClientsFilter] = useState('')
  const [assignedClientsFilter, setAssignedClientsFilter] = useState('')
  const [dialogClient, setDialogClient] = useState(false)
  const [dialogAssistant, setDialogAssistant] = useState(false)
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(
    null
  )
  const [clientsToUnassign, setClientsToUnassign] = useState<Client[]>([])
  const [clientsToAssign, setClientsToAssign] = useState<Client[]>([])
  const [formClient, setFormClient] = useState<Client>({
    nome: '',
    codigo: '',
    rede: '',
  })
  const [formAssistant, setFormAssistant] = useState<Assistant>({
    nome: '',
    email: '',
    telefone: '',
  })

  const getAllAssistants = async () => {
    const { data } = await api.get('/assistant/getAll')
    setAssistants(data.rows)
    setSelectedAssistant(data.rows[0])
  }

  const getUnassignedClients = async () => {
    const { data } = await api.get('/client/getUnassignedClients')
    setUnassignedClients(data.rows)
  }

  const assignClients = async () => {
    await api.post('/client/assignClients', {
      clientIds: clientsToAssign.map((client: Client) => client.id),
      idAssistente: selectedAssistant?.id,
    })
    setClientsToAssign([])
    await getUnassignedClients()
    await getAssignedClients()
  }

  const unassignClients = async () => {
    await api.post('/client/unassignClients', {
      clientIds: clientsToUnassign.map((client: Client) => client.id),
      idAssistente: selectedAssistant?.id,
    })
    setClientsToUnassign([])
    await getUnassignedClients()
    await getAssignedClients()
  }

  const unassignedClientsFiltered = unassignedClients.filter((client: Client) =>
    client.nome.toLowerCase().includes(unassignedClientsFilter.toLowerCase())
  )

  const assignedClientsFiltered = assignedClients.filter((client: Client) =>
    client.nome.toLowerCase().includes(assignedClientsFilter.toLowerCase())
  )

  const getAssignedClients = useCallback(async () => {
    if (!selectedAssistant) return
    const { data } = await api.get(
      `/client/getAssignedClientsById/${selectedAssistant.id}`
    )
    setAssignedClients(data.rows)
  }, [selectedAssistant])

  const clearFormClient = () => {
    setFormClient({
      nome: '',
      codigo: '',
      rede: '',
    })
    setDialogClient(false)
  }

  const clearFormAsssistant = () => {
    setFormAssistant({
      nome: '',
      email: '',
      telefone: '',
    })
    setDialogAssistant(false)
  }

  const handleFormClient = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormClient((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFormAssistant = (e: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = e.target
    setFormAssistant((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const createClient = async () => {
    await api.post('/client/createClient', formClient)
    clearFormClient()
    await getUnassignedClients()
  }

  const createAssistant = async () => {
    await api.post('/assistant/createAssistant', formAssistant)
    clearFormAsssistant()
    await getAllAssistants()
  }

  useEffect(() => {
    getAssignedClients()
  }, [getAssignedClients])

  useEffect(() => {
    getAllAssistants()
    getUnassignedClients()
  }, [])

  return (
    <div className='flex min-h-screen bg-layout-body'>
      <SideBar />
      <main className='flex-1 p-8 flex flex-col'>
        <h1 className='text-3xl font-bold text-primary'>
          Carteira de Clientes
        </h1>
        <p className='pt-8 pb-2 text-sm text-primary'>
          Selecione o Assistente Comercial
        </p>
        <div className='flex max-w-[450px] h-[43px]'>
          <div className='relative flex-1'>
            <select
              onChange={(e) => {
                const selectedId = parseInt(e.target.value)
                const selectedAssistantObj = assistants.find(
                  (assistant) => assistant.id === selectedId
                )
                if (selectedAssistantObj) {
                  setSelectedAssistant(selectedAssistantObj)
                }
              }}
              style={{ lineHeight: '18.75px' }}
              className='w-full h-full p-3 rounded-xl appearance-none pr-8 outline-none transition-all focus:ring-2 ring-offset-2 ring-[#00BDFF] border border-border-color'
            >
              {assistants.map((assistant) => (
                <option
                  key={assistant.id}
                  value={assistant.id}
                >
                  {assistant.nome}
                </option>
              ))}
            </select>
            <span className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <PiCaretDown
                color='#121929'
                size='18'
              />
            </span>
          </div>
          <button
            onClick={() => setDialogAssistant(true)}
            className='flex justify-center items-center px-4 py-1 bg-[#00BDFF] rounded-[22px] w-[54px] ml-2'
          >
            <PiPlusCircle
              color='#FFFFFF'
              size='24'
            />
          </button>
        </div>
        <div className='flex md:flex-row flex-col h-full gap-4 pt-6'>
          <Card.Root>
            <Card.Header>
              <Card.Title
                title='Clientes (Não vinculados)'
                quantity={unassignedClientsFiltered.length}
              />
              <Card.Actions>
                <Card.Action
                  onClick={() => setDialogClient(true)}
                  text='Adicionar cliente'
                  icon={PiPlusCircle}
                />
                <Card.Action
                  onClick={assignClients}
                  text='Vincular'
                  color='#5E17F5'
                  icon={PiArrowCircleRight}
                  iconPosition='right'
                />
              </Card.Actions>
            </Card.Header>
            <Card.SearchBar
              onChange={(e) => setUnassignedClientsFilter(e.target.value)}
            />
            <Card.List
              list={unassignedClientsFiltered}
              onSelectedItemsChange={(items) => setClientsToAssign(items)}
            />
          </Card.Root>
          <Card.Root>
            <Card.Header>
              <Card.Title
                title={`Carteira de ${selectedAssistant?.nome || ''}`}
                quantity={assignedClientsFiltered.length}
              />
              <Card.Actions>
                <Card.Action
                  onClick={unassignClients}
                  text='Desvincular'
                  color='#FF4E3A'
                  icon={PiArrowCircleLeft}
                  iconPosition='right'
                />
              </Card.Actions>
            </Card.Header>
            <Card.SearchBar
              onChange={(e) => setAssignedClientsFilter(e.target.value)}
            />
            <Card.List
              list={assignedClientsFiltered}
              onSelectedItemsChange={(items) => setClientsToUnassign(items)}
            />
          </Card.Root>
        </div>
      </main>
      <Modal
        open={dialogClient}
        onClose={clearFormClient}
      >
        <h1 className='font-bold text-xl'>Cadastro de Cliente</h1>
        <div className='mt-4 border border-border-color rounded-[18px] flex flex-col gap-6 p-6'>
          <div className='flex flex-col gap-3'>
            <span>Código do Cliente</span>
            <input
              name='codigo'
              onChange={handleFormClient}
              value={formClient.codigo}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span>Nome do cliente</span>
            <input
              name='nome'
              onChange={handleFormClient}
              value={formClient.nome}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span>Rede</span>
            <input
              name='rede'
              onChange={handleFormClient}
              value={formClient.rede}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
        </div>
        <div className='flex justify-end w-full mt-10 gap-6'>
          <button
            onClick={clearFormClient}
            className='bg-border-color px-6 min-w-[255.5px] py-2 rounded-3xl text-side-bar-icon font-bold'
          >
            Cancelar
          </button>
          <button
            onClick={createClient}
            disabled={Object.values(formClient).some(
              (value) => value.trim() === ''
            )}
            className='bg-[#00BDFF] disabled:bg-gray-500 px-6 min-w-[255.5px] py-2 rounded-3xl text-white font-bold'
          >
            Salvar
          </button>
        </div>
      </Modal>
      <Modal
        open={dialogAssistant}
        onClose={clearFormAsssistant}
      >
        <h1 className='font-bold text-xl'>Cadastro de Assistente Comercial</h1>
        <div className='mt-4 border border-border-color rounded-[18px] flex flex-col gap-6 p-6'>
          <div className='flex flex-col gap-3'>
            <span>Nome Completo</span>
            <input
              name='nome'
              onChange={handleFormAssistant}
              value={formAssistant.nome}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span>Email</span>
            <input
              name='email'
              onChange={handleFormAssistant}
              value={formAssistant.email}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <span>Telefone</span>
            <input
              name='telefone'
              onChange={handleFormAssistant}
              value={formAssistant.telefone}
              className='px-3 py-2 border border-border-color outline-none rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
              type='text'
              placeholder='Buscar'
            />
          </div>
        </div>
        <div className='flex justify-end w-full mt-10 gap-6'>
          <button
            onClick={clearFormAsssistant}
            className='bg-border-color px-6 min-w-[255.5px] py-2 rounded-3xl text-side-bar-icon font-bold'
          >
            Cancelar
          </button>
          <button
            onClick={createAssistant}
            disabled={Object.values(formAssistant).some(
              (value) => value.trim() === ''
            )}
            className='bg-[#00BDFF] disabled:bg-gray-500 px-6 min-w-[255.5px] py-2 rounded-3xl text-white font-bold'
          >
            Salvar
          </button>
        </div>
      </Modal>
    </div>
  )
}
