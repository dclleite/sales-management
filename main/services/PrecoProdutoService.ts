import { ipcMain } from "electron";
import { Cliente } from "../../db/model/Cliente";
import { PrecoProduto, ProductPriceChannels } from "../../db/model/PrecoProduto";
import { Produto } from "../../db/model/Produto";

import { createConnection } from '../helpers'


const knexConnection = createConnection()

type teste = {
  nome: string
  valor: number
}

ipcMain.handle(ProductPriceChannels.GET_PRECO_PRODUTO, async  (event, clienteId: number, produtoId: number) => {
  const teste = await knexConnection<PrecoProduto>('precoProduto')
    .where({clienteId, produtoId})
    .join<Cliente>('clientes', 'clienteId', '=', 'clientes.id' )
    .join<Produto>('produtos', 'produtoId', '=', 'produtos.id' )
    .first()

  return teste
});

ipcMain.handle(ProductPriceChannels.GET_PRECO_PRODUTOS,  (event) => {
  return knexConnection<PrecoProduto>('precoProduto')
});

ipcMain.handle(ProductPriceChannels.INSERT_PRECO_PRODUTO,  (event, precoProduto: PrecoProduto) => {
  return knexConnection<PrecoProduto>('precoProduto').insert(precoProduto)
});

