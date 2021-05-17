import { ipcRenderer, contextBridge } from "electron";
import { Cliente, CustomerChannels } from "../db/model/Cliente";
import { PrecoProduto, ProductPriceChannels } from "../db/model/PrecoProduto";
import { Produto, ProductChannels } from "../db/model/Produto";


contextBridge.exposeInMainWorld("api", {
  // client session
  getCliente: (id: number) => ipcRenderer.invoke(CustomerChannels.GET_CLIENTE, id),
  getClientes: () => ipcRenderer.invoke(CustomerChannels.GET_CLIENTES),
  insertCliente: (cliente: Cliente) => ipcRenderer.invoke(CustomerChannels.INSERT_CLIENTE, cliente),
  insertClientes: (clientes: Cliente[]) => ipcRenderer.invoke(CustomerChannels.INSERT_CLIENTES, clientes),

  // product session
  getProduto: (id: number) => ipcRenderer.invoke(ProductChannels.GET_PRODUTO, id),
  getProdutos: () => ipcRenderer.invoke(ProductChannels.GET_PRODUTOS),
  insertProduto: (produto: Produto) => ipcRenderer.invoke(ProductChannels.INSERT_PRODUTO, produto),
  insertProdutos: (produtos: Produto[]) => ipcRenderer.invoke(ProductChannels.INSERT_PRODUTOS, produtos),

  // product price session
  getPrecoProduto: (clienteId: number, produtoId: number) => ipcRenderer.invoke(ProductPriceChannels.GET_PRECO_PRODUTO, clienteId, produtoId),
  getPrecoProdutos: () => ipcRenderer.invoke(ProductPriceChannels.GET_PRECO_PRODUTOS),
  insertPrecoProduto: (precoProduto: PrecoProduto) => ipcRenderer.invoke(ProductPriceChannels.INSERT_PRECO_PRODUTO, precoProduto),
});
