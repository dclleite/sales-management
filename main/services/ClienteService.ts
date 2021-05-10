import { ipcMain } from "electron";
import { Cliente, CustomerChannels } from "../../db/model/Cliente";

import { createConnection } from '../helpers'


const knexConnection = createConnection()

ipcMain.handle(CustomerChannels.GET_CLIENTE,  (event, id: number) => {
  return knexConnection<Cliente>('clientes').where('id', id).first()
});

ipcMain.handle(CustomerChannels.GET_CLIENTES,  (event) => {
  return knexConnection<Cliente>('clientes')
});

ipcMain.handle(CustomerChannels.INSERT_CLIENTE,  (event, cliente: Cliente) => {
  return knexConnection<Cliente>('clientes').insert(cliente)
});

ipcMain.handle(CustomerChannels.INSERT_CLIENTES,  (event, clientes: Cliente[]) => {
  return knexConnection<Cliente>('clientes').insert(clientes)
});
