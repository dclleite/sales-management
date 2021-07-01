import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { Table } from '../../components/Table'
import { PageControl } from '../../components/PageControl'
import { PencilIcon } from '../../components/Icons'

import { getOrders } from '../../services/OrderService'

import { formattedOrder } from '../../../db/model/Order'

import styles from './styles.module.scss'

const ORDER_PER_PAGE = 10

interface OrderSearch {
  orderList: formattedOrder[]
  totalPages: number
  searchedName: string
}

function formatOrderToTable(orderList: formattedOrder[], render: (orderList: formattedOrder) => JSX.Element) {
  return orderList.map((order) => [order.client.name, order.totalPrice, new Date(order.orderDate).toLocaleDateString(), render(order)])
}

function getOrderListByPage(page: number, searchName?: string): Promise<OrderSearch> {
  return getOrders(searchName ? `%${searchName}%` : '').then((orders) => {
    const startIndex = (page - 1) * ORDER_PER_PAGE
    const pageClients = orders.slice(startIndex, startIndex + ORDER_PER_PAGE)
    return {
      orderList: pageClients,
      totalPages: Math.ceil(orders.length / ORDER_PER_PAGE),
      searchedName: searchName,
    }
  })
}

function order() {
  const [orderList, setOrderList] = useState<formattedOrder[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const headers = ['Cliente', 'Valor', 'Data da venda', 'Ações']

  useEffect(() => {
    getOrderListByPage(page).then((orderSearch) => {
      if (orderSearch.orderList.length > 0) {
        setOrderList(orderSearch.orderList)
        setLastPage(orderSearch.totalPages)
      }
    })
  }, [])

  function nextPage() {
    if (lastPage > 1) {
      const newPage = page + 1
      getOrderListByPage(newPage, searchedName).then((orderSearch) => {
        if (orderSearch.orderList.length > 0) {
          setOrderList(orderSearch.orderList)
          setPage(newPage)
          setLastPage(orderSearch.totalPages)
        }
      })
    }
  }

  function previousPage() {
    if (page > 1) {
      const newPage = page - 1
      getOrderListByPage(newPage, searchedName).then((orderSearch) => {
        if (orderSearch.orderList.length > 0) {
          setOrderList(orderSearch.orderList)
          setPage(newPage)
          setLastPage(orderSearch.totalPages)
        }
      })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Vendas - Neoplast</title>
      </Head>
      <div className={styles.orderContainer}>
        <div className={styles.header}>
          <SearchInput
            value={searchName}
            onChange={setSearchName}
            onClick={() => {
              getOrderListByPage(1, searchName).then((orderSearch) => {
                if (orderSearch.orderList.length > 0) {
                  setOrderList(orderSearch.orderList)
                  setPage(1)
                  setLastPage(orderSearch.totalPages)
                  setSearchedName(orderSearch.searchedName)
                }
              })
            }}
          />
          <Link href='/order/new'>
            <Button>Registrar nova venda</Button>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          {/* <Table
            headers={headers}
            bodies={formatOrderToTable(orderList, (order) => {
              return <a>teste</a>
            })}
          /> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default order
