import { formattedOrder } from '../../db/model/Order'

export function getOrders(searchName?: string): Promise<formattedOrder[]> {
  return window.api.orderQueries.getAll(searchName)
}
