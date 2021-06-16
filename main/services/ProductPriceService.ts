import { ipcMain } from "electron";
import { Client } from "../../db/model/Client";
import { ProductPrice, ProductPriceChannels } from "../../db/model/ProductPrice";
import { Product } from "../../db/model/Product";

import { createConnection } from '../helpers'
import { uuid } from "uuidv4";


const knexConnection = createConnection()

type teste = {
  nome: string
  valor: number
}

ipcMain.handle(ProductPriceChannels.GET_BY_PRODUCT_ID, async (event, productId: string) => {
  const teste = await knexConnection<ProductPrice>('productPrice')
    .where('productId', productId)
    .join<Client>('clients', 'clientId', '=', 'clients.id')
    .join<Product>('products', 'productId', '=', 'products.id')
    .select({
      clientName: 'client.name',
      productName: 'product.name',
      unit: 'product.unit',
      price: 'productPrice.price',
    })

  return teste
});

ipcMain.handle(ProductPriceChannels.GET_BY_CLIENT_ID, async (event, clientId: string) => {
  const teste = await knexConnection<ProductPrice>('productPrice')
    .where('clientId', clientId)
    .join<Client>('clients', 'clientId', '=', 'clients.id')
    .join<Product>('products', 'productId', '=', 'products.id')
    .select({
      clientName: 'client.name',
      productName: 'product.name',
      unit: 'product.unit',
      price: 'productPrice.price',
    })

  return teste
});

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
});

ipcMain.handle(ProductPriceChannels.INSERT_PRODUCT_PRICE, (event, productPrice: ProductPrice) => {
  return knexConnection<ProductPrice>('productPrice').insert({ ...productPrice, id: uuid() })
});

ipcMain.handle(ProductPriceChannels.UPDATE_PRODUCT_PRICE, (event, productPrice: ProductPrice) => {
  return knexConnection<ProductPrice>('productPrice').where('id', productPrice.id).update(productPrice)
});

