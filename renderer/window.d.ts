declare interface Window {
  api: {
    productQueries: {
      getById: (id: string) => Promise<import('../db/model/Product').Product>,
      getAll: () => Promise<import('../db/model/Product').Product[]>,
      insert: (product: import('../db/model/Product').Product) => Promise<number>,
      update: (product: import('../db/model/Product').Product) => Promise<number>,
    },

    clientQueries: {
      getById: (id: string) => Promise<import('../db/model/Client').Client>
      getAll: (serachName?: string) => Promise<import('../db/model/Client').Client[]>
      insert: (client: import('../db/model/Client').Client) => Promise<number[]>
      update: (client: import('../db/model/Client').Client) => Promise<number>
    },

    productionQueries: {
      getAll: () => Promise<import('../db/model/DailyProduction').DailyProduction[]>
      getById: (id: string) => Promise<import('../db/model/DailyProduction').DailyProduction>
      insert: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<number[]>
      update: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<number>
    },
  }
}
