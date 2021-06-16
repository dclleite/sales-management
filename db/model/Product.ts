export type Product = {
  id?: string,
  name: string,
  unit: string,
  price: number,
}

export enum ProductChannels {
  GET_BY_ID = 'get-product',
  GET_ALL = 'get-products',
  INSERT_PRODUCT = 'insert-product',
  UPDATE_PRODUCT = 'update-product'
}