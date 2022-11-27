export type Client = {
  id?: string
  name: string
  cpfCnpj?: string
  phone?: string
  email?: string
  street?: string
  streetNumber?: string
  neighborhood?: string
  cep?: string
  city?: string
  state?: string
}

export enum ClientChannels {
  GET_BY_ID = 'get-client',
  GET_ALL = 'get-clients',
  GET_AVAILABLE_CLIENTS = 'get-available-clients',
  INSERT_CLIENT = 'insert-client',
  UPDATE_CLIENT = 'update-client',
}
