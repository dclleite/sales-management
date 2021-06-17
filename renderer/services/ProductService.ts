import { Product } from "../../db/model/Product";

export function getProducts(): Promise<Product[]> {
  return window.api.productQueries.getAll()
}

export function saveProduct(product: Product): Promise<number> {
  return window.api.productQueries.insert(product)
}