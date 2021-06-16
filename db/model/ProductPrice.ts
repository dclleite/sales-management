export type ProductPrice = {
  id?: string,
  clienteId: string,
  produtoId: string,
  valor: number,
}

export enum ProductPriceChannels {
  GET_BY_PRODUCT_ID = 'get-by-product-id',
  GET_BY_CLIENT_ID = 'get-by-client-id',
  GET_ALL = 'get-products-price',
  INSERT_PRODUCT_PRICE = 'insert-product-price',
  UPDATE_PRODUCT_PRICE = 'update-product-price',
}