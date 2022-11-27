import { ProductPrice } from './../../db/model/ProductPrice'
import { FormattedProductPrice } from '../../db/model/ProductPrice'

export function getByProductId(productId: string, searchName?: string): Promise<FormattedProductPrice[]> {
  return window.api.productPriceQueries.getByProductId(productId, searchName)
}

export function getByClientId(clientId: string): Promise<ProductPrice[]> {
  return window.api.productPriceQueries.getByClientId(clientId)
}

export function insert(price: ProductPrice): Promise<String[]> {
  return window.api.productPriceQueries.insert(price)
}

export function update(price: ProductPrice): Promise<String> {
  return window.api.productPriceQueries.update(price)
}
