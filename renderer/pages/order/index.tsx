import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { Table } from '../../components/Table'
import { PageControl } from '../../components/PageControl'
import { PencilIcon, EyeIcon, CircleAlert } from '../../components/Icons'

import { getOrders, updateOrder } from '../../services/OrderService'
import { getOrderProductsByOrderId } from '../../services/OrderProductService'

import { FormattedOrder } from '../../../db/model/Order'

import styles from './styles.module.scss'
import ModalNota, { SaleNote } from '../../components/ModalNota'
import { OrderProduct } from '../../../db/model/OrderProduct'
import { formatPrice } from '../../utils/Formatter'
import { Modal } from '../../components/Modal'
import { getStockByProductIds, updateProductStock } from '../../services/ProductSotckService'

const ORDER_PER_PAGE = 10

interface OrderSearch {
  orderList: FormattedOrder[]
  totalPages: number
  searchedName: string
}

const initialState: SaleNote = {
  total: 0,
  discount: 0,
  date: '',
  clientName: '',
  clientAddress: '',
  clientCpfCnpj: '',
  products: [],
}

const inititalCurrentOrderFormatter: FormattedOrder = {
  id: '',
  client: {
    name: '',
  },
  orderDate: '',
  deliveryDate: '',
  totalPrice: 0,
  discount: 0,
  completedOrder: false,
}

function formatOrderToTable(
  orderList: FormattedOrder[],
  renderStatus: (order: FormattedOrder) => string | JSX.Element,
  render: (order: FormattedOrder) => JSX.Element
) {
  return orderList.map((order) => [
    order.client.name,
    formatPrice(order.totalPrice),
    new Date(order.orderDate).toLocaleDateString('en-GB'),
    renderStatus(order),
    render(order),
  ])
}

function formatOrderToNote(order: FormattedOrder, orderProductList: OrderProduct[]): SaleNote {
  return {
    total: order.totalPrice,
    discount: order.discount,
    date: order.orderDate,
    clientName: order.client.name,
    clientAddress: order.client.street,
    clientCpfCnpj: order.client.cpfCnpj,
    products: orderProductList.map(({ productId, name, unit, price, quantity }) => ({
      id: productId,
      productName: name,
      unit,
      unitPrice: price,
      quantity,
      total: quantity * price,
    })),
  }
}

function getOrderListByPage(page: number, searchName?: string): Promise<OrderSearch> {
  return getOrders(searchName ? `%${searchName}%` : '').then((orders) => {
    const startIndex = (page - 1) * ORDER_PER_PAGE
    const pageClients = orders
      .sort((p1, p2) => new Date(p2.orderDate).getTime() - new Date(p1.orderDate).getTime())
      .slice(startIndex, startIndex + ORDER_PER_PAGE)
    return {
      orderList: pageClients,
      totalPages: Math.ceil(orders.length / ORDER_PER_PAGE),
      searchedName: searchName,
    }
  })
}

function order() {
  const [orderList, setOrderList] = useState<FormattedOrder[]>([])
  const [saleNote, setSaleNote] = useState<SaleNote>(initialState)
  const [currentOrderFormatted, setCurrentOrderFormatted] = useState<FormattedOrder>(inititalCurrentOrderFormatter)

  const [searchName, setSearchName] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [openModalNote, setOpenModalNote] = useState(false)
  const [openFinishSaleModal, setOpenFinishSaleModal] = useState(false)

  const headers = ['Cliente', 'Valor', 'Data da venda', 'Status', 'Ações']

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

  function viewNote(order: FormattedOrder) {
    getOrderProductsByOrderId(order.id).then((response) => {
      setSaleNote(formatOrderToNote(order, response))
      setOpenModalNote(true)
    })
  }

  function renderActTable(order: FormattedOrder) {
    return (
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
        <button onClick={() => viewNote(order)}>
          <EyeIcon />
        </button>
        <Link
          href={{
            pathname: '/order/new',
            query: {
              orderId: order.id,
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

  function renderActStatus(order: FormattedOrder): string | JSX.Element {
    if (order) {
      if (order.completedOrder) {
        return 'Finalizado'
      } else {
        return (
          <div>
            <a
              onClick={() => {
                setCurrentOrderFormatted(order)
                setOpenFinishSaleModal(true)
              }}
            >
              Finalizar venda
            </a>
          </div>
        )
      }
    }
  }

  function finishSale() {
    const { id, orderDate, deliveryDate, totalPrice, discount, client } = currentOrderFormatted
    updateOrder({
      id,
      orderDate,
      deliveryDate,
      totalPrice,
      discount,
      clientId: client.id,
      completedOrder: true,
    }).then(() => {
      getOrderProductsByOrderId(id)
        .then((orderProductList) =>
          getStockByProductIds(orderProductList.map((value) => value.productId)).then((productStockList) =>
            Promise.all(
              productStockList.map((stock) => {
                const orderQuantity = orderProductList.find((value) => value.productId === stock.productId).quantity
                return updateProductStock({
                  ...stock,
                  quantity: stock.quantity - orderQuantity,
                  reservedQuantity: stock.reservedQuantity - orderQuantity,
                })
              })
            )
          )
        )
        .then(() => {
          setCurrentOrderFormatted(inititalCurrentOrderFormatter)
          setOpenFinishSaleModal(false)
          getOrderListByPage(page, searchedName).then((orderSearch) => {
            if (orderSearch.orderList.length > 0) {
              setOrderList(orderSearch.orderList)
              setLastPage(orderSearch.totalPages)
            }
          })
        })
    })
  }

  function renderFinishSaleModal() {
    return (
      <Modal maxWidth='sm' open={openFinishSaleModal} onClose={() => setOpenFinishSaleModal(false)}>
        <div className={styles.finishSaleModal}>
          <CircleAlert />
          <p>
            Deseja finalizar a venda realizada no dia{' '}
            <strong>{new Date(currentOrderFormatted.orderDate).toLocaleDateString('en-GB')}</strong> referente ao
            cliente <strong>{currentOrderFormatted.client.name}</strong> no valor de{' '}
            <strong>{formatPrice(currentOrderFormatted.totalPrice)}</strong>?
          </p>
          <div className={styles.finishButtonContainer}>
            <Button onClick={() => setOpenFinishSaleModal(false)}>Cancelar</Button>
            <Button appearance='ghost' onClick={finishSale}>
              Finalizar
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  function renderNote() {
    return (
      <ModalNota
        open={openModalNote}
        close={() => {
          setOpenModalNote(false)
        }}
        sale={saleNote}
      />
    )
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
            placeholder='Pesquisar cliente'
          />
          <Link href='/order/new'>
            <Button>Registrar nova venda</Button>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={formatOrderToTable(orderList, renderActStatus, renderActTable)} />
        </div>
      </div>
      {renderNote()}
      {renderFinishSaleModal()}
    </React.Fragment>
  )
}

export default order
