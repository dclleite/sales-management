import { ProductStock } from "../../db/model/ProductStock";

export function getProductsStock(): Promise<ProductStock[]> {
  return window.api.productStockQueries.getAll()
}

export function getProductStockById(id: string): Promise<ProductStock> {
  return window.api.productStockQueries.getById(id)
}

export function saveProductStock(product: ProductStock): Promise<string[]> {
  return window.api.productStockQueries.insert(product)
}

export function updateProductStock(product: ProductStock): Promise<string> {
  return window.api.productStockQueries.update(product)
}