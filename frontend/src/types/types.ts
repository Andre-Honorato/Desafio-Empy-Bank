export interface Assistant {
  id?: number,
  nome: string,
  email: string,
  telefone: string
}

export interface Client {
  id?: number,
  codigo: string,
  nome: string,
  rede: string,
  idAssistente?: number
}