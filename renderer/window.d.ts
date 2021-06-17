declare interface Window {
  api: {

    productQueries: {
      getById: (id: string) => Promise<import('../db/model/Product').Product>,
      getAll: () => Promise<import('../db/model/Product').Product[]>
      insert: (product: import('../db/model/Product').Product) => Promise<number>,
      update: (product: import('../db/model/Product').Product) => Promise<number>,
    },
    // client session
    getCliente: (id: number) => Promise<import('../db/model/Cliente').Client>
    getClientes: () => Promise<import('../db/model/Cliente').Client[]>
    insertCliente: (cliente: import('../db/model/Cliente').Client) => Promise<number[]>
    insertClientes: (clientes: import('../db/model/Cliente').Client[]) => Promise<number[]>


    // product price session
    getPrecoProduct: (clienteId: number, productId: number) => Promise<any>
    getPrecoProducts: () => Promise<any>
    insertPrecoProduct: (precoProduct: import('../db/model/ProductPrice').ProductPrice) => Promise<number[]>
  }
}