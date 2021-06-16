export type Order = {
  id?: string
  clientId: string
  orderDate: string
  deliveryDate: string
}

export enum OrderChannels {
  GET_BY_ID = 'get-order',
  GET_BY_CLIENT_ID = 'get-orders-by-client',
  GET_ALL = 'get-orders',
  INSERT_ORDER = 'insert-order',
}