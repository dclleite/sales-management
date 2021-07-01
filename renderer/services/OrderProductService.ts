import { OrderProduct } from './../../db/model/OrderProduct'

export function insertOrderProductList(orderProductList: OrderProduct[]): Promise<string[]> {
  return window.api.orderProductQueries.insertList(orderProductList)
}
