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
function renderActTable(productId) {
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
      <Link
        href={{
          pathname: '/product/product-price',
          query: {
            productId,
            editing: true,
          },
        }}
      >
        <a>Ver clietes</a>
      </Link>

      <Link
        href={{
          pathname: '/product/new-product',
          query: {
            productId,
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

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

interface ProductsSearch {
  products: (string | JSX.Element)[][]
  totalPages: number
}

function getProductsByPage(page: number, set: Function, search?: string): Promise<ProductsSearch> {
  return getProducts().then((products) => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE
    let filter = products
    if (search) {
      filter = products.filter(product => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    const pageProducts = filter.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
    const newProducts = pageProducts.map((product) => [
      product.name,
      product.unit,
      formatPrice(product.price),
      renderActTable(product.id),
    ])
    set(newProducts)
    return {
      products: newProducts,
      totalPages: Math.ceil(filter.length / PRODUCTS_PER_PAGE),
    }
  })
}

function Product() {
  const [products, setProducts] = useState<(string | JSX.Element)[][]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [search, setSearch] = useState('')
  const [confirmedSearch, setConfirmedSearch] = useState('')
  const headers = ['Produto', 'Unidade', 'Preço', 'Ações']

  useEffect(() => {
    if (products.length === 0) {
      getProductsByPage(page, setProducts).then((search) => setLastPage(search.totalPages))
    }
  }, [])

  function nextPage() {
    if (page < lastPage) {
      getProductsByPage(page + 1, setProducts, confirmedSearch).then((newProducts) => {
        if (newProducts.products.length > 0) {
          setPage(page + 1)
        }
      })
    }
  }

  function previousPage() {
    if (page > 1) {
      getProductsByPage(page - 1, setProducts, confirmedSearch).then(() => setPage(page - 1))
    }
  }

  function applySearch() {
    setConfirmedSearch(search)
    getProductsByPage(1, setProducts, search).then((search) => {
      setLastPage(search.totalPages)
      setPage(1)
    })
  }

  return (
    <React.Fragment>
      <Head>
        <title>Produtos - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}>
          <SearchInput value={search} onChange={setSearch} onClick={applySearch} />
          <Link href='/product/new-product'>
            <Button>Adicionar novo produto</Button>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={products} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Product
