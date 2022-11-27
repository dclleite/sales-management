import { DailyProduction, ProductProduction } from "../../db/model/DailyProduction";

export function getProductions(): Promise<ProductProduction[]> {
  return window.api.productionQueries.getAll()
}

export function getProductionById(id: string): Promise<DailyProduction> {
  return window.api.productionQueries.getById(id)
}

export function saveProduction(production: DailyProduction): Promise<string[]> {
  return window.api.productionQueries.insert(production)
}

export function updateProduction(production: DailyProduction): Promise<string> {
  return window.api.productionQueries.update(production)
}