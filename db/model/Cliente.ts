export type Client = {
  id?: string
  name: string
  cpfCnpj: string
  phone: string
  email: string
  street: string
  streetNumber: string
  neighborhood: string
  cep: string
  city: string
  state: string
}

export enum CustomerChannels {
  GET_CLIENT = 'get-client',
  GET_CLIENTS = 'get-clients',
  INSERT_CLIENT = 'insert-client',
  UPDATE_CLIENT = 'update-client',
}