export type ProductStock = {
  id: string
  productId: string
  quantity: number
  reservedQuantity: number
}

export enum ProductStockChannels {
  GET_ALL = 'get-product-stock',
  GET_BY_PRODUCT_ID = 'get-product-stock-by-product',
  INSERT = 'insert-product-stock',
  UPDATE = 'update-product-stock',
}