declare interface Window {
  api: {
    // client session
    getCliente: (id: number) => Promise<import('../db/model/Cliente').Client>
    getClientes: () => Promise<import('../db/model/Cliente').Client[]>
    insertCliente: (cliente: import('../db/model/Cliente').Client) => Promise<number[]>
    insertClientes: (clientes: import('../db/model/Cliente').Client[]) => Promise<number[]>

    // product session
    getProduto: (id: number) => Promise<import('../db/model/Produto').Produto>
    getProdutos: () => Promise<import('../db/model/Produto').Produto[]>
    insertProduto: (produto: import('../db/model/Produto').Produto) => Promise<number[]>
    insertProdutos: (produtos: import('../db/model/Produto').Produto[]) => Promise<number[]>

    // product price session
    getPrecoProduto: (clienteId: number, produtoId: number) => Promise<any>
    getPrecoProdutos: () => Promise<any>
    insertPrecoProduto: (precoProduto: import('../db/model/ProductPrice').ProductPrice) => Promise<number[]>
  }
}