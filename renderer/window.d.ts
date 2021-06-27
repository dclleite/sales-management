declare interface Window {
  api: {
    productQueries: {
      getById: (id: string) => Promise<import('../db/model/Product').Product>,
      getAll: () => Promise<import('../db/model/Product').Product[]>,
      insert: (product: import('../db/model/Product').Product) => Promise<string[]>,
      update: (product: import('../db/model/Product').Product) => Promise<string>,
    },

    clientQueries: {
      getById: (id: string) => Promise<import('../db/model/Client').Client>
      getAll: (serachName?: string) => Promise<import('../db/model/Client').Client[]>
      insert: (client: import('../db/model/Client').Client) => Promise<string[]>
      update: (client: import('../db/model/Client').Client) => Promise<string>
    },

    productionQueries: {
      getAll: () => Promise<import('../db/model/DailyProduction').DailyProduction[]>
      getById: (id: string) => Promise<import('../db/model/DailyProduction').DailyProduction>
      insert: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<string[]>
      update: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<string>
    },

    productStockQueries: {
      getAll: () => Promise<import('../db/model/ProductStock').ProductStock[]>,
      getById: (id: string) => Promise<import('../db/model/ProductStock').ProductStock>
      insert: (productStock: import('../db/model/ProductStock').ProductStock) => Promise<string[]>
      update: (productStock: import('../db/model/ProductStock').ProductStock) => Promise<string>
    }
  }
}
