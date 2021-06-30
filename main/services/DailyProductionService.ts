import { ipcMain } from "electron";
import { DailyProduction, DailyProductionChannels, ProductProduction } from "../../db/model/DailyProduction";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';
import { Product } from "../../db/model/Product";


const knexConnection = createConnection()

ipcMain.handle(DailyProductionChannels.GET_BY_PRODUCT_ID, (event, productId: string) => {
  return knexConnection<DailyProduction>('dailyProduction').where('id', productId).first()
});

ipcMain.handle(DailyProductionChannels.GET_ALL, (event) => {
  return knexConnection<DailyProduction>('dailyProduction')
    .join<Product>('product', 'productId', '=', 'product.id').select<
      ProductProduction[]
    >({
      id: 'dailyProduction.id',
      productId: 'dailyProduction.productId',
      productName: 'product.name',
      date: 'dailyProduction.date',
      quantity: 'dailyProduction.quantity'
    })
});

ipcMain.handle(DailyProductionChannels.INSERT, (event, dailyProduction: DailyProduction) => {
  return knexConnection<DailyProduction>('dailyProduction').insert({ ...dailyProduction })
});

ipcMain.handle(DailyProductionChannels.UPDATE, (event, dailyProduction: DailyProduction) => {
  return knexConnection<DailyProduction>('dailyProduction').where('id', dailyProduction.id).update(dailyProduction)
});
