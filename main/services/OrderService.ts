import { ipcMain } from "electron";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';
import { Order, OrderChannels } from "../../db/model/Order";


const knexConnection = createConnection()

ipcMain.handle(OrderChannels.GET_BY_ID, (event, id: string) => {
  return knexConnection<Order>('order').where('id', id).first()
});
ipcMain.handle(OrderChannels.GET_BY_CLIENT_ID, (event, clientId: string) => {
  return knexConnection<Order>('order').where('clientId ', clientId).first()
});

ipcMain.handle(OrderChannels.GET_ALL, (event) => {
  return knexConnection<Order>('order')
});

ipcMain.handle(OrderChannels.INSERT_ORDER, (event, order: Order) => {
  return knexConnection<Order>('order').insert({ ...order, id: uuid() })
});

