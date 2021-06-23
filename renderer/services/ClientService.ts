import { Client } from '../../db/model/Client'

export function getClient(id: string): Promise<Client> {
  return window.api.clientQueries.getById(id)
}

export function getClients(): Promise<Client[]> {
  return window.api.clientQueries.getAll()
}

export function saveClient(client: Client): Promise<number[]> {
  return window.api.clientQueries.insert(client)
}

export function updateClient(client: Client): Promise<number> {
  return window.api.clientQueries.update(client)
}
