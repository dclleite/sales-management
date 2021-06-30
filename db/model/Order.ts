import { Client } from './Client'
export type Order = {
  id?: string
  clientId: string
  orderDate: string
  deliveryDate: string
  totalPrice: number
  completedOrder: boolean
}

export type formattedOrder = {
  id?: string
  client: Client
  orderDate: string
  deliveryDate: string
  totalPrice: number
  completedOrder: boolean
}

export enum OrderChannels {
  GET_BY_ID = 'get-order',
  GET_BY_CLIENT_ID = 'get-orders-by-client',
  GET_ALL = 'get-orders',
  INSERT_ORDER = 'insert-order',
}
