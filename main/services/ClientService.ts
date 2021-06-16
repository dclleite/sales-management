import { ipcMain } from "electron";
import { Client, ClientChannels } from "../../db/model/Client";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';


const knexConnection = createConnection()

ipcMain.handle(ClientChannels.GET_BY_ID, (event, id: string) => {
  return knexConnection<Client>('client').where('id', id).first()
});

ipcMain.handle(ClientChannels.GET_ALL, (event) => {
  return knexConnection<Client>('client')
});

ipcMain.handle(ClientChannels.INSERT_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').insert({ ...client, id: uuid() })
});

ipcMain.handle(ClientChannels.UPDATE_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').where('id', client.id).update(client)
});
