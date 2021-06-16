export type DailyProduction = {
  id: string
  productId: string
  date: string
  quantity: number
}

export enum DailyProductionChannels {
  GET_ALL = 'get-daily-production',
  GET_BY_PRODUCT_ID = 'get-daily-production-by-product',
  INSERT = 'insert-daily-production',
  UPDATE = 'update-daily-production',
}