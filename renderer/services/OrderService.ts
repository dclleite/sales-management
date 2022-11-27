import { Order, FormattedOrder } from './../../db/model/Order'

export function getOrders(searchName?: string): Promise<FormattedOrder[]> {
  return window.api.orderQueries.getAll(searchName)
}

export function getOrderById(orderId: string): Promise<Order> {
  return window.api.orderQueries.getById(orderId)
}

export function insertOrder(order: Order): Promise<string[]> {
  return window.api.orderQueries.insert(order)
}

export function updateOrder(order: Order): Promise<string> {
  return window.api.orderQueries.update(order)
}
