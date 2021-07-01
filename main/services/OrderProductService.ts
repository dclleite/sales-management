import { ipcMain } from 'electron'

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4'
import { OrderProduct, OrderProductChannels } from '../../db/model/OrderProduct'

const knexConnection = createConnection()

ipcMain.handle(OrderProductChannels.GET_BY_ID, (event, id: string) => {
  return knexConnection<OrderProduct>('orderProduct').where('id', id).first()
})

ipcMain.handle(OrderProductChannels.GET_BY_ORDER_ID, (event, orderId: string) => {
  return knexConnection<OrderProduct>('orderProduct').where('orderId ', orderId)
})

ipcMain.handle(OrderProductChannels.GET_ALL, (event) => {
  return knexConnection<OrderProduct>('orderProduct')
})

ipcMain.handle(OrderProductChannels.INSERT, (event, orderProduct: OrderProduct) => {
  return knexConnection<OrderProduct>('orderProduct').insert({ ...orderProduct, id: uuid() })
})

ipcMain.handle(OrderProductChannels.INSERT_ORDER_PRODUCT_LIST, (event, orderProduct: OrderProduct[]) => {
  return knexConnection<OrderProduct>('orderProduct').insert(orderProduct.map((value) => ({ ...value, id: uuid() })))
})
