import { ProductStock, ProductStockFormatted } from '../../db/model/ProductStock'

export function getProductsStock(): Promise<ProductStockFormatted[]> {
  return window.api.productStockQueries.getAll()
}

export function getProductStockById(id: string): Promise<ProductStock> {
  return window.api.productStockQueries.getById(id)
}

export function getStockByProductIds(productIds: string[]): Promise<ProductStock[]> {
  return window.api.productStockQueries.getByProductIds(productIds)
}

export function saveProductStock(product: ProductStock): Promise<string[]> {
  return window.api.productStockQueries.insert(product)
}

export function updateProductStock(product: ProductStock): Promise<string> {
  return window.api.productStockQueries.update(product)
}
