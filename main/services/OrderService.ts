import { formattedOrder } from './../../db/model/Order'
import { Client } from './../../db/model/Client'
import { ipcMain } from 'electron'

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4'
import { Order, OrderChannels } from '../../db/model/Order'

const knexConnection = createConnection()

ipcMain.handle(OrderChannels.GET_BY_ID, (event, id: string) => {
  return knexConnection<Order>('order').where('id', id).first()
})
ipcMain.handle(OrderChannels.GET_BY_CLIENT_ID, (event, clientId: string) => {
  return knexConnection<Order>('order').where('clientId ', clientId).first()
})

ipcMain.handle(OrderChannels.GET_ALL, async (event, searchName?: string) => {
  const orderList = knexConnection<Order>('order')
    .join<Client>('client', 'clientId', '=', 'client.id')
    .select<(Order & Client & { orderId: string })[]>('*', 'order.id as orderId')

  const orderListLike = await (searchName ? orderList.where('name', 'like', searchName) : orderList)

  return orderListLike.map(({ orderId, orderDate, deliveryDate, totalPrice, clientId, ...rest }) => {
    return {
      id: orderId,
      orderDate,
      deliveryDate,
      totalPrice,
      client: {
        id: clientId,
        ...rest,
      },
    }
  })
})

ipcMain.handle(OrderChannels.INSERT_ORDER, (event, order: Order) => {
  return knexConnection<Order>('order').insert({ ...order, id: uuid() })
})
