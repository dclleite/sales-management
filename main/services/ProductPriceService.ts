import { FormattedProductPrice } from './../../db/model/ProductPrice'
import { ipcMain } from 'electron'
import { Client } from '../../db/model/Client'
import { ProductPrice, ProductPriceChannels } from '../../db/model/ProductPrice'
import { Product } from '../../db/model/Product'

import { createConnection } from '../helpers'
import { uuid } from 'uuidv4'

const knexConnection = createConnection()

ipcMain.handle(ProductPriceChannels.GET_BY_PRODUCT_ID, async (event, productId: string, searchName?: string) => {
  const productPrice = knexConnection<ProductPrice>('productPrice')
    .where('productId', productId)
    .join<Client>('client', 'clientId', '=', 'client.id')
    .join<Product>('product', 'productId', '=', 'product.id')

  const pricesSelect = (searchName ? productPrice.where('client.name', 'like', searchName) : productPrice).select<
    FormattedProductPrice[]
  >({
    id: 'productPrice.id',
    clientId: 'client.id',
    clientName: 'client.name',
    clientCpfCnpj: 'client.cpfCnpj',
    productId: 'product.id',
    productName: 'product.name',
    unit: 'product.unit',
    price: 'productPrice.price',
  })

  return pricesSelect
})

ipcMain.handle(ProductPriceChannels.GET_BY_CLIENT_ID, async (event, clientId: string) => {
  return knexConnection<ProductPrice>('productPrice')
    .where('clientId', clientId)
    .join<Client>('client', 'clientId', '=', 'client.id')
    .join<Product>('product', 'productId', '=', 'product.id')
    .select('productPrice.*')
})

ipcMain.handle(ProductPriceChannels.GET_ALL, (event) => {
  return knexConnection<ProductPrice>('productPrice')
    .join<Product>('product', 'product.id', '=', 'productPrice.productId')
    .join<Client>('client', 'client.id', '=', 'productPrice.clientId')
    .select({
      clientName: 'client.name',
      productName: 'product.name',
      unit: 'product.unit',
      price: 'productPrice.price',
    })
})

ipcMain.handle(ProductPriceChannels.INSERT_PRODUCT_PRICE, (event, productPrice: ProductPrice) => {
  return knexConnection<ProductPrice>('productPrice').insert({ ...productPrice })
})

ipcMain.handle(ProductPriceChannels.UPDATE_PRODUCT_PRICE, (event, productPrice: ProductPrice) => {
  return knexConnection<ProductPrice>('productPrice').where('id', productPrice.id).update(productPrice)
})
