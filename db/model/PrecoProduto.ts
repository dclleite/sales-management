export type PrecoProduto = {
  id?: number,
  clienteId: number,
  produtoId: number,
  valor: number,
}

export enum ProductPriceChannels {
  GET_PRECO_PRODUTO= 'get-preco-produto',
  GET_PRECO_PRODUTOS = 'get-preco-produtos',
  INSERT_PRECO_PRODUTO= 'insert-preco-produto',
  INSERT_PRECO_PRODUTOS = 'insert-preco-produtos'
}