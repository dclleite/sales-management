declare interface Window {
  api: {
    clientQueries: {
      getById: (id: string) => Promise<import('../db/model/Client').Client>
      getAll: () => Promise<import('../db/model/Client').Client[]>
      insert: (client: import('../db/model/Client').Client) => Promise<number[]>
      update: (client: import('../db/model/Client').Client) => Promise<number>
    }

    productQueries: {
      getById: (id: string) => Promise<import('../db/model/Product').Product>
      getAll: () => Promise<import('../db/model/Product').Product[]>
      insert: (product: import('../db/model/Product').Product) => Promise<number>
      update: (product: import('../db/model/Product').Product) => Promise<number>
    }

    // product price session
    getPrecoProduct: (clienteId: number, productId: number) => Promise<any>
    getPrecoProducts: () => Promise<any>
    insertPrecoProduct: (precoProduct: import('../db/model/ProductPrice').ProductPrice) => Promise<number[]>
  }
}
