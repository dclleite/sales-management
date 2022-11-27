import { Product } from './../../db/model/Product'
import { ipcMain } from 'electron'
import { ProductStock, ProductStockChannels } from '../../db/model/ProductStock'

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4'

const knexConnection = createConnection()

ipcMain.handle(ProductStockChannels.GET_BY_PRODUCT_ID, (event, productId: string) => {
  return knexConnection<ProductStock>('productStock').where('productId', productId).first()
})

ipcMain.handle(ProductStockChannels.GET_BY_PRODUCT_IDS, (event, productIds: string[]) => {
  return knexConnection<ProductStock>('productStock').whereIn('productId', productIds)
})

ipcMain.handle(ProductStockChannels.GET_ALL, async (event) => {
  const productStock = await knexConnection<ProductStock>('productStock')
    .join<Product>('product', 'productId', '=', 'product.id')
    .select<(ProductStock & Product & { productStockId: string })[]>('*', 'productStock.id as productStockId')

  return productStock.map(({ productStockId, quantity, reservedQuantity, ...product }) => ({
    id: productStockId,
    quantity,
    reservedQuantity,
    product,
  }))
})

ipcMain.handle(ProductStockChannels.INSERT, (event, productStock: ProductStock) => {
  return knexConnection<ProductStock>('productStock').insert({ ...productStock, id: uuid() })
})

ipcMain.handle(ProductStockChannels.UPDATE, (event, productStock: ProductStock) => {
  return knexConnection<ProductStock>('productStock').where('id', productStock.id).update(productStock)
})
