declare interface Window {
  api: {
    productQueries: {
      getById: (id: string) => Promise<import('../db/model/Product').Product>
      getAll: () => Promise<import('../db/model/Product').Product[]>
      insert: (product: import('../db/model/Product').Product) => Promise<string[]>
      update: (product: import('../db/model/Product').Product) => Promise<string>
    }

    clientQueries: {
      getById: (id: string) => Promise<import('../db/model/Client').Client>
      getAll: (serachName?: string) => Promise<import('../db/model/Client').Client[]>
      getAvailableClients: (productId: string) => Promise<import('../db/model/Client').Client[]>
      insert: (client: import('../db/model/Client').Client) => Promise<string[]>
      update: (client: import('../db/model/Client').Client) => Promise<string>
    }

    productionQueries: {
      getAll: () => Promise<import('../db/model/DailyProduction').ProductProduction[]>
      getById: (id: string) => Promise<import('../db/model/DailyProduction').DailyProduction>
      insert: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<string[]>
      update: (dailyProduction: import('../db/model/DailyProduction').DailyProduction) => Promise<string>
    }

    productStockQueries: {
      getAll: () => Promise<import('../db/model/ProductStock').ProductStock[]>
      getById: (id: string) => Promise<import('../db/model/ProductStock').ProductStock>
      getByProductIds: (productIds: string[]) => Promise<import('../db/model/ProductStock').ProductStock[]>
      insert: (productStock: import('../db/model/ProductStock').ProductStock) => Promise<string[]>
      update: (productStock: import('../db/model/ProductStock').ProductStock) => Promise<string>
    }

    productPriceQueries: {
      getByProductId: (
        productId: string,
        searchName?: string
      ) => Promise<import('../db/model/ProductPrice').FormattedProductPrice[]>
      getByClientId: (clientId: string) => Promise<import('../db/model/ProductPrice').ProductPrice[]>
      insert: (price: import('../db/model/ProductPrice').ProductPrice) => Promise<string[]>
      update: (price: import('../db/model/ProductPrice').ProductPrice) => Promise<string>
    }

    orderQueries: {
      getById: (id: string) => Promise<import('../db/model/Order').Order>
      getAll: (searchName?: string) => Promise<import('../db/model/Order').formattedOrder[]>
      insert: (order: import('../db/model/Order').Order) => Promise<string[]>
    }

    orderProductQueries: {
      getAll: () => Promise<import('../db/model/OrderProduct').OrderProduct[]>
      getById: (id: string) => Promise<import('../db/model/OrderProduct').OrderProduct>
      getByOrderId: (orderId: string) => Promise<import('../db/model/OrderProduct').OrderProduct[]>
      insert: (orderProduct: import('../db/model/OrderProduct').OrderProduct) => Promise<string[]>
      insertList: (orderProduct: import('../db/model/OrderProduct').OrderProduct[]) => Promise<string[]>
    }
  }
}
