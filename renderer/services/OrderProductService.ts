import { OrderProduct } from './../../db/model/OrderProduct'

export function insertOrderProductList(orderProductList: OrderProduct[]): Promise<string[]> {
  return window.api.orderProductQueries.insertList(orderProductList)
}

export function updateOrderProduct(orderProduct: OrderProduct): Promise<string> {
  return window.api.orderProductQueries.update(orderProduct)
}

export function getOrderProductsByOrderId(orderId: string): Promise<OrderProduct[]> {
  return window.api.orderProductQueries.getByOrderId(orderId)
}

export function deleteOrderProduct(orderProductIds: string[]): Promise<string> {
  return window.api.orderProductQueries.delete(orderProductIds)
}
