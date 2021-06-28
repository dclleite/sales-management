import { FormattedProductPrice } from '../../db/model/ProductPrice'

export function getByProductId(productId: string, searchName?: string): Promise<FormattedProductPrice[]> {
  return window.api.productPriceQueries.getByProductId(productId, searchName)
}
