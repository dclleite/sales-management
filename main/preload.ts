import { ipcRenderer, contextBridge } from "electron";
import { Client, ClientChannels } from "../db/model/Client";
import { ProductPrice, ProductPriceChannels } from "../db/model/ProductPrice";
import { Product, ProductChannels } from "../db/model/Product";
import { OrderChannels } from "../db/model/Order";


contextBridge.exposeInMainWorld("api", {
  clientQueries: {
    getById: (id: string) => ipcRenderer.invoke(ClientChannels.GET_BY_ID, id),
    getAll: () => ipcRenderer.invoke(ClientChannels.GET_ALL),
    insert: (client: Client) => ipcRenderer.invoke(ClientChannels.INSERT_CLIENT, client),
    update: (client: Client) => ipcRenderer.invoke(ClientChannels.UPDATE_CLIENT, client),
  },

  productQueries: {
    getById: (id: string) => ipcRenderer.invoke(ProductChannels.GET_BY_ID, id),
    gerAll: () => ipcRenderer.invoke(ProductChannels.GET_ALL),
    insert: (product: Product) => ipcRenderer.invoke(ProductChannels.INSERT_PRODUCT, product),
    update: (product: Product) => ipcRenderer.invoke(ProductChannels.UPDATE_PRODUCT, product),
  },

  productPriceQueries: {
    getAll: () => ipcRenderer.invoke(ProductPriceChannels.GET_ALL),
    getByClientId: (clientId: string) => ipcRenderer.invoke(ProductPriceChannels.GET_BY_CLIENT_ID, clientId),
    getByProductId: (productID: string) => ipcRenderer.invoke(ProductPriceChannels.GET_BY_PRODUCT_ID, productID),
    insert: (productPrice: ProductPrice) => ipcRenderer.invoke(ProductPriceChannels.INSERT_PRODUCT_PRICE, productPrice),
    update: (productPrice: ProductPrice) => ipcRenderer.invoke(ProductPriceChannels.UPDATE_PRODUCT_PRICE, productPrice),
  },

  orderQueries: {
    getById: (id: string) => ipcRenderer.invoke(OrderChannels.GET_BY_ID, id),
    getAll: () => ipcRenderer.invoke(OrderChannels.GET_ALL),
    insert: (client: Client) => ipcRenderer.invoke(OrderChannels.INSERT_ORDER, client),
    getByClientId: (clientId: string) => ipcRenderer.invoke(OrderChannels.GET_BY_CLIENT_ID, clientId),
  }
});
