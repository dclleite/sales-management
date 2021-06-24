import { Client } from '../../db/model/Client'

export function getClient(id: string): Promise<Client> {
  return window.api.clientQueries.getById(id)
}

export function getClients(searchName?: string): Promise<Client[]> {
  return window.api.clientQueries.getAll(searchName)
}

export function saveClient(client: Client): Promise<number[]> {
  return window.api.clientQueries.insert(client)
}

export function updateClient(client: Client): Promise<number> {
  return window.api.clientQueries.update(client)
}
