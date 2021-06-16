import { ipcMain } from "electron";
import { ProductStock, ProductStockChannels } from "../../db/model/ProductStock";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';


const knexConnection = createConnection()

ipcMain.handle(ProductStockChannels.GET_BY_PRODUCT_ID, (event, productId: string) => {
  return knexConnection<ProductStock>('productStock').where('id', productId).first()
});

ipcMain.handle(ProductStockChannels.GET_ALL, (event) => {
  return knexConnection<ProductStock>('productStock')
});

ipcMain.handle(ProductStockChannels.INSERT, (event, productStock: ProductStock) => {
  return knexConnection<ProductStock>('productStock').insert({ ...productStock, id: uuid() })
});

ipcMain.handle(ProductStockChannels.UPDATE, (event, productStock: ProductStock) => {
  return knexConnection<ProductStock>('productStock').where('id', productStock.id).update(productStock)
});
