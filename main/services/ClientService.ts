import { ProductPrice } from './../../db/model/ProductPrice'
import { ipcMain } from 'electron'
import { Client, ClientChannels } from '../../db/model/Client'

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4'

const knexConnection = createConnection()

import fs from 'fs'

ipcMain.handle(ClientChannels.GET_BY_ID, (event, id: string) => {
  return knexConnection<Client>('client').where('id', id).first()
})

ipcMain.handle('get_fs', () => {
  return fs.readFileSync('./resources/db')
  // .readdirSync('./')
})

ipcMain.handle('write_fs', (event, path) => {
  const file = fs.readFileSync(path)
  return fs.writeFileSync('./resources/db', file)
})

ipcMain.handle(ClientChannels.GET_ALL, (event, searchName?: string) => {
  const clients = knexConnection<Client>('client')
  return searchName ? clients.where('name', 'like', searchName) : clients
})

ipcMain.handle(ClientChannels.GET_AVAILABLE_CLIENTS, (event, productId: string) => {
  const idsClient = knexConnection<ProductPrice>('productPrice').where('productId', productId).select('clientId')
  const clients = knexConnection<Client>('client').whereNotIn('id', idsClient)
  return clients
})

ipcMain.handle(ClientChannels.INSERT_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').insert({ ...client, id: uuid() })
})

ipcMain.handle(ClientChannels.UPDATE_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').where('id', client.id).update(client)
})
