import { Product } from './Product'
import { Client } from './Client'

export type ProductPrice = {
  id?: string
  clientId: string
  productId: string
  price: number
}

export type FormattedProductPrice = {
  id?: string
  clientId: string
  clientName: string
  clientCpfCnpj?: string
  productId: string
  productName?: string
  unit?: string
  price: number
}

export enum ProductPriceChannels {
  GET_BY_PRODUCT_ID = 'get-by-product-id',
  GET_BY_CLIENT_ID = 'get-by-client-id',
  GET_ALL = 'get-products-price',
  INSERT_PRODUCT_PRICE = 'insert-product-price',
  UPDATE_PRODUCT_PRICE = 'update-product-price',
}
