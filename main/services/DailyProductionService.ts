import { ipcMain } from "electron";
import { DailyProduction, DailyProductionChannels } from "../../db/model/DailyProduction";

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4';


const knexConnection = createConnection()

ipcMain.handle(DailyProductionChannels.GET_BY_PRODUCT_ID, (event, productId: string) => {
  return knexConnection<DailyProduction>('dailyProduction').where('id', productId).first()
});

ipcMain.handle(DailyProductionChannels.GET_ALL, (event) => {
  return knexConnection<DailyProduction>('dailyProduction')
});

ipcMain.handle(DailyProductionChannels.INSERT, (event, dailyProduction: DailyProduction) => {
  return knexConnection<DailyProduction>('dailyProduction').insert({ ...dailyProduction, id: uuid() })
});

ipcMain.handle(DailyProductionChannels.UPDATE, (event, dailyProduction: DailyProduction) => {
  return knexConnection<DailyProduction>('dailyProduction').where('id', dailyProduction.id).update(dailyProduction)
});
