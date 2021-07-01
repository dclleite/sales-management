import { Order } from './../../db/model/Order'
import { formattedOrder } from '../../db/model/Order'

export function getOrders(searchName?: string): Promise<formattedOrder[]> {
  return window.api.orderQueries.getAll(searchName)
}

export function insertOrder(order: Order): Promise<string[]> {
  return window.api.orderQueries.insert(order)
}
