import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { TextInput } from '../../components/TextInput'
import { Table } from '../../components/Table'
import { PageControl } from '../../components/PageControl'

import { PencilIcon } from '../../components/Icons'

import styles from './styles.module.scss'
import { getProducts, saveProduct } from '../../services/ProductService'
import Link from 'next/link'
import { getProductions } from '../../services/DailyProductionService'
import FeedbackModal from '../../components/FeedbackModal'
import ModalNota from '../../components/ModalNota'
import backup from '../../services/backup.json'
import { Client } from '../../../db/model/Client'
import { Product } from '../../../db/model/Product'
import { ProductPrice } from '../../../db/model/ProductPrice'
import { Order } from '../../../db/model/Order'
import { OrderProduct } from '../../../db/model/OrderProduct'
import { saveClient } from '../../services/ClientService'
import { insert } from '../../services/ProductPriceService'



const mapTables = async () => {
  const newClients = backup.clientes.map((old): Client => ({
    name: old.nome,
    street: old.endereco,
    phone: old.telefone,
    cpfCnpj: old.cpfCnpj.replace('-', '').replace('/', '').replace('.', ''),
    id: old.id.toString()
  }))

  console.log('clients')
  await Promise.all(newClients.map(saveClient))

  const newProducts = backup.produtos.map((old): Product => ({
    name: old.nome,
    price: old.valor,
    unit: old.unidade,
    id: old.id.toString()
  }))

  console.log('products')
  await Promise.all(newProducts.map(saveProduct))

  const newPrices = backup.precosProduto.map((old): ProductPrice => ({
    price: old.valor,
    clientId: old.clienteId.toString(),
    productId: old.produtoId.toString(),
    id: old.id.toString()
  }))

  console.log('productPrice')
  await Promise.all(newPrices.map(insert))

  const newOrders: Order[] = [];
  const newProductOrders: OrderProduct[] = []

  backup.vendas.forEach((old) => {
    let total = 0
    old.itemsVenda.forEach(item => {
      total += item.valor

      const { unit, name } = newProducts.find(p => p.id === item.produtoId.toString())
      newProductOrders.push({
        orderId: old.id.toString(),
        productId: item.produtoId.toString(),
        quantity: Number.parseInt(item.quantity),
        price: item.valor,
        unit,
        name
      })
    })

    newOrders.push({
      clientId: old.clienteId.toString(),
      orderDate: old.dataEntrega,
      deliveryDate: old.dataVenda,
      totalPrice: total,
      completedOrder: true
    })

    // console.log('productPrice')
    // await Promise.all(newOrders.map(saveOrder))

    // console.log('productPrice')
    // await Promise.all(newProductOrders.map(saveOrderProduct))
  })
}

function renderNota() {
  return <ModalNota open={false} close={console.log} />
}

function renderActTable(productionId) {
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
      <Link
        href={{
          pathname: '/daily-production/new',
          query: {
            productionId,
            editing: true,
          },
        }}
      >
        <button>
          <PencilIcon />
        </button>
      </Link>
    </div>
  )
}

const PRODUCTS_PER_PAGE = 10

interface ProductsSearch {
  products: (string | JSX.Element)[][]
  totalPages: number
}

async function getProductionByPage(page: number, set: Function): Promise<ProductsSearch> {
  const products = (await getProductions()).sort((p1, p2) => new Date(p1.date).getTime() - new Date(p2.date).getTime())
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE
  const pageProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  const newProducts = pageProducts.map((production) => [
    production.productName,
    new Date(production.date).toLocaleDateString(),
    production.quantity.toString(),
    renderActTable(production.id),
  ])
  if (newProducts.length > 0) {
    set(newProducts)
  }
  return {
    products: newProducts,
    totalPages: Math.ceil(products.length / PRODUCTS_PER_PAGE),
  }
}

function DailyProduction() {
  const [products, setProducts] = useState<(string | JSX.Element)[][]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const headers = ['Produto', 'Data', 'Quantidade', 'Ações']

  useEffect(() => {
    if (products.length === 0) {
      getProductionByPage(page, setProducts).then((search) => setLastPage(search.totalPages))
    }
  }, [])

  function nextPage() {
    console.log('asdasdasdas')
    mapTables()
    getProductionByPage(page + 1, setProducts).then((newProducts) => {
      if (newProducts.products.length > 0) {
        setPage(page + 1)
      }
    })
  }

  function previousPage() {
    if (page > 1) {
      getProductionByPage(page - 1, setProducts).then(() => setPage(page - 1))
    }
  }

  async function addProduct(event: any) {
    console.log(event)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Products - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}>
          <SearchInput value='product' onChange={(value) => console.log(value)} />
          <Link href='/daily-production/new'>
            <Button>Adicionar nova produção</Button>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={products} />
        </div>
      </div>
      {renderNota()}
    </React.Fragment>
  )
}

export default DailyProduction
