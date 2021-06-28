import { ipcRenderer, contextBridge } from 'electron'
import { Client, ClientChannels } from '../db/model/Client'
import { ProductPrice, ProductPriceChannels } from '../db/model/ProductPrice'
import { Product, ProductChannels } from '../db/model/Product'
import { OrderChannels } from '../db/model/Order'
import { DailyProduction, DailyProductionChannels } from '../db/model/DailyProduction'
import { ProductStockChannels } from '../db/model/ProductStock'
import { OrderProduct, OrderProductChannels } from '../db/model/OrderProduct'

contextBridge.exposeInMainWorld('api', {
  clientQueries: {
    getById: (id: string) => ipcRenderer.invoke(ClientChannels.GET_BY_ID, id),
    getAll: (searchName?: string) => ipcRenderer.invoke(ClientChannels.GET_ALL, searchName),
    insert: (client: Client) => ipcRenderer.invoke(ClientChannels.INSERT_CLIENT, client),
    update: (client: Client) => ipcRenderer.invoke(ClientChannels.UPDATE_CLIENT, client),
  },

  productQueries: {
    getById: (id: string) => ipcRenderer.invoke(ProductChannels.GET_BY_ID, id),
    getAll: () => ipcRenderer.invoke(ProductChannels.GET_ALL),
    insert: (product: Product) => ipcRenderer.invoke(ProductChannels.INSERT_PRODUCT, product),
    update: (product: Product) => ipcRenderer.invoke(ProductChannels.UPDATE_PRODUCT, product),
  },

  productPriceQueries: {
    getAll: () => ipcRenderer.invoke(ProductPriceChannels.GET_ALL),
    getByClientId: (clientId: string) => ipcRenderer.invoke(ProductPriceChannels.GET_BY_CLIENT_ID, clientId),
    getByProductId: (productID: string, searchName?: string) =>
      ipcRenderer.invoke(ProductPriceChannels.GET_BY_PRODUCT_ID, productID, searchName),
    insert: (productPrice: ProductPrice) => ipcRenderer.invoke(ProductPriceChannels.INSERT_PRODUCT_PRICE, productPrice),
    update: (productPrice: ProductPrice) => ipcRenderer.invoke(ProductPriceChannels.UPDATE_PRODUCT_PRICE, productPrice),
  },

  orderQueries: {
    getById: (id: string) => ipcRenderer.invoke(OrderChannels.GET_BY_ID, id),
    getAll: () => ipcRenderer.invoke(OrderChannels.GET_ALL),
    insert: (client: Client) => ipcRenderer.invoke(OrderChannels.INSERT_ORDER, client),
    getByClientId: (clientId: string) => ipcRenderer.invoke(OrderChannels.GET_BY_CLIENT_ID, clientId),
  },

  orderProductQueries: {
    getAll: () => ipcRenderer.invoke(OrderProductChannels.GET_ALL),
    getById: (id: string) => ipcRenderer.invoke(OrderProductChannels.GET_BY_ID, id),
    insert: (orderProduct: OrderProduct) => ipcRenderer.invoke(OrderProductChannels.INSERT, orderProduct),
    getByOrderId: (orderId: string) => ipcRenderer.invoke(OrderProductChannels.GET_BY_ORDER_ID, orderId),
  },

  productionQueries: {
    getAll: () => ipcRenderer.invoke(DailyProductionChannels.GET_ALL),
    getById: (productId: string) => ipcRenderer.invoke(DailyProductionChannels.GET_BY_PRODUCT_ID, productId),
    insert: (dailyProduction: DailyProduction) => ipcRenderer.invoke(DailyProductionChannels.INSERT, dailyProduction),
    update: (dailyProduction: DailyProduction) => ipcRenderer.invoke(DailyProductionChannels.UPDATE, dailyProduction),
  },

  productStockQueries: {
    getAll: () => ipcRenderer.invoke(ProductStockChannels.GET_ALL),
    getById: (productId: string) => ipcRenderer.invoke(ProductStockChannels.GET_BY_PRODUCT_ID, productId),
    insert: (productStock: DailyProduction) => ipcRenderer.invoke(ProductStockChannels.INSERT, productStock),
    update: (productStock: DailyProduction) => ipcRenderer.invoke(ProductStockChannels.UPDATE, productStock),
  },
})
