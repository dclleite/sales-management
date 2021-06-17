import { Client } from '../../db/model/Client'

export function getClients(): Promise<Client[]> {
  return window.api.clientQueries.getAll()
}

export function saveClient(client: Client): Promise<number[]> {
  return window.api.clientQueries.insert(client)
}
