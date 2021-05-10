import { ipcMain } from "electron";
import { Produto, ProductChannels } from "../../db/model/Produto";

import { createConnection } from '../helpers'


const knexConnection = createConnection()

ipcMain.handle(ProductChannels.GET_PRODUTO,  (event, id: number) => {
  return knexConnection<Produto>('produtos').where('id', id).first()
});

ipcMain.handle(ProductChannels.GET_PRODUTOS,  (event) => {
  return knexConnection<Produto>('produtos')
});

ipcMain.handle(ProductChannels.INSERT_PRODUTO,  (event, produto: Produto) => {
  return knexConnection<Produto>('produtos').insert(produto)
});

ipcMain.handle(ProductChannels.INSERT_PRODUTOS,  (event, produtos: Produto[]) => {
  return knexConnection<Produto>('produtos').insert(produtos)
});
