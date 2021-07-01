import { OrderProduct } from './../../db/model/OrderProduct'

export function insertOrderProductList(orderProductList: OrderProduct[]): Promise<string[]> {
  return window.api.orderProductQueries.insertList(orderProductList)
}

export function insertOrderProduct(orderProductList: OrderProduct): Promise<string[]> {
  return window.api.orderProductQueries.insert(orderProductList)
}

export function getOrderProductsByOrderId(orderId: string): Promise<OrderProduct[]> {
  return window.api.orderProductQueries.getByOrderId(orderId)
}
