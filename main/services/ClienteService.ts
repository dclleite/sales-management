import { ipcMain } from "electron";
import { Client, CustomerChannels } from "../../db/model/Cliente";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';


const knexConnection = createConnection()

ipcMain.handle(CustomerChannels.GET_CLIENT, (event, id: string) => {
  return knexConnection<Client>('client').where('id', id).first()
});

ipcMain.handle(CustomerChannels.GET_CLIENTS, (event) => {
  return knexConnection<Client>('client')
});

ipcMain.handle(CustomerChannels.INSERT_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').insert({ ...client, id: uuid() })
});

ipcMain.handle(CustomerChannels.UPDATE_CLIENT, (event, client: Client) => {
  return knexConnection<Client>('client').where('id', client.id).update(client)
});
