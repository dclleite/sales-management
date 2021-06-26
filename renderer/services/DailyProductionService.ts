import { DailyProduction } from "../../db/model/DailyProduction";

export function getProductions(): Promise<DailyProduction[]> {
  return window.api.productionQueries.getAll()
}

export function getProductionById(id: string): Promise<DailyProduction> {
  return window.api.productionQueries.getById(id)
}

export function saveProduction(production: DailyProduction): Promise<number[]> {
  return window.api.productionQueries.insert(production)
}

export function updateProduction(production: DailyProduction): Promise<number> {
  return window.api.productionQueries.update(production)
}