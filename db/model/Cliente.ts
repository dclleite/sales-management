export type Cliente = {
  id?: number
  nome: string
  cpfCnpj?: string
  endereco?: string
  telefone?: string
}

export enum CustomerChannels {
  GET_CLIENTE = 'get-cliente',
  GET_CLIENTES = 'get-clientes',
  INSERT_CLIENTE = 'insert-cliente',
  INSERT_CLIENTES = 'insert-clientes'
}