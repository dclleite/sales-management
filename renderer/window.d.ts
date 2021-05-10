declare interface Window {
  api: {
    // client session
    getCliente: (id: number) => Promise<import('../db/model/Cliente').Cliente>
    getClientes: () => Promise<import('../db/model/Cliente').Cliente[]>
    insertCliente: (cliente: import('../db/model/Cliente').Cliente) => Promise<number[]>
    insertClientes: (clientes: import('../db/model/Cliente').Cliente[]) => Promise<number[]>

    // product session
    getProduto: (id: number) => Promise<import('../db/model/Produto').Produto>
    getProdutos: () => Promise<import('../db/model/Produto').Produto[]>
    insertProduto: (produto: import('../db/model/Produto').Produto) => Promise<number[]>
    insertProdutos: (produtos: import('../db/model/Produto').Produto[]) => Promise<number[]>
  }
}