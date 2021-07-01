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

function Product() {
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

  return (
    <React.Fragment>
      <Head>
        <title>Produção diária - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}>
          <SearchInput value='' onChange={(value) => console.log(value)} />
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

export default Product
