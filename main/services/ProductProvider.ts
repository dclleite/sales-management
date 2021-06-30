import { ipcMain } from "electron";
import { uuid } from "uuidv4";
import { Product, ProductChannels } from "../../db/model/Product";

import { createConnection } from '../helpers'


const knexConnection = createConnection()

ipcMain.handle(ProductChannels.GET_BY_ID, (event, id: number) => {
  return knexConnection<Product>('product').where('id', id).first()
});

ipcMain.handle(ProductChannels.GET_ALL, (event) => {
  return knexConnection<Product>('product')
});

ipcMain.handle(ProductChannels.INSERT_PRODUCT, async (event, product: Product) => {
  const id = uuid()
  await knexConnection<Product>('product').insert({ ...product })
  return [id]
});

ipcMain.handle(ProductChannels.UPDATE_PRODUCT, (event, product: Product) => {
  return knexConnection<Product>('product').where('id', product.id).update(product)
});
