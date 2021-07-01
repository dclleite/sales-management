export type OrderProduct = {
  id?: string
  orderId: string
  productId: string
  name: string
  quantity: number
  unit: string
  price: number
}

export enum OrderProductChannels {
  GET_BY_ID = 'get-order-product',
  GET_BY_ORDER_ID = 'get-order-product-by-order',
  GET_ALL = 'get-order-products',
  INSERT = 'insert-order-product',
  INSERT_ORDER_PRODUCT_LIST = 'insert-order-product-list',
}
