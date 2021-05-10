export type Produto = {
  id?: number,
  nome: string,
  unidade: string,
  valor: number,
  descricao?: string,
}

export enum ProductChannels {
  GET_PRODUTO = 'get-produto',
  GET_PRODUTOS = 'get-products',
  INSERT_PRODUTO = 'insert-produto',
  INSERT_PRODUTOS = 'insert-produtos'
}