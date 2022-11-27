import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { Table } from '../../components/Table'
import { PageControl } from '../../components/PageControl'
import { PencilIcon } from '../../components/Icons'

import styles from './styles.module.scss'
import { ProductStockFormatted } from '../../../db/model/ProductStock'
import { getProductsStock } from '../../services/ProductSotckService'

const STOCK_PER_PAGE = 15

interface StockSearch {
  productStocks: ProductStockFormatted[]
  totalPages: number
  // searchedName: string
}

function formatStockToTable(stocks: ProductStockFormatted[]) {
  return stocks.map((stock) => [
    stock.product.name,
    stock.product.unit,
    stock.quantity - stock.reservedQuantity,
    stock.reservedQuantity,
    stock.quantity,
  ])
}

function getStockByPage(page: number): Promise<StockSearch> {
  return getProductsStock().then((productStock) => {
    const startIndex = (page - 1) * STOCK_PER_PAGE
    const pageStocks = productStock.slice(startIndex, startIndex + STOCK_PER_PAGE)

    return {
      productStocks: pageStocks,
      totalPages: Math.ceil(productStock.length / STOCK_PER_PAGE),
    }
  })
}

function Stock() {
  const [productStockList, setProductStockList] = useState<ProductStockFormatted[]>([])

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const headers = ['Produto', 'Unidade', 'Disponivel', 'Reservado', 'Quantidade Total']

  useEffect(() => {
    getStockByPage(page).then((stockSearch) => {
      if (stockSearch.productStocks.length > 0) {
        setProductStockList(stockSearch.productStocks)
        setLastPage(stockSearch.totalPages)
      }
    })
  }, [])

  function nextPage() {
    if (lastPage > 1) {
      const newPage = page + 1
      getStockByPage(newPage).then((stockSearch) => {
        if (stockSearch.productStocks.length > 0) {
          setProductStockList(stockSearch.productStocks)
          setPage(newPage)
          setLastPage(stockSearch.totalPages)
        }
      })
    }
  }

  function previousPage() {
    if (page > 1) {
      const newPage = page - 1
      getStockByPage(newPage).then((stockSearch) => {
        if (stockSearch.productStocks.length > 0) {
          setProductStockList(stockSearch.productStocks)
          setPage(newPage)
          setLastPage(stockSearch.totalPages)
        }
      })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Estoque - Neoplast</title>
      </Head>
      <div className={styles.productStockContainer}>
        <div className={styles.title}>
          <h2>Estoque de produtos</h2>
        </div>
        <div className={styles.header}>
          {/* <SearchInput
            value={searchName}
            onChange={setSearchName}
            onClick={() => {
              getClientsByPage(1, searchName).then((clientsSearch) => {
                if (clientsSearch.clients.length > 0) {
                  setClients(clientsSearch.clients)
                  setPage(1)
                  setLastPage(clientsSearch.totalPages)
                  setSearchedName(clientsSearch.searchedName)
                }
              })
            }}
          /> */}
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={formatStockToTable(productStockList)} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Stock
