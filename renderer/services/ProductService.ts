import { Product } from "../../db/model/Product";

export function getProducts(): Promise<Product[]> {
  return window.api.productQueries.getAll()
}

export function getProductById(id: string): Promise<Product> {
  return window.api.productQueries.getById(id)
}

export function saveProduct(product: Product): Promise<number> {
  return window.api.productQueries.insert(product)
}

export function updateProduct(product: Product): Promise<number> {
  return window.api.productQueries.update(product)
}