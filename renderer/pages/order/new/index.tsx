import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'

import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import { CustomSelect } from '../../../components/CustomSelect'
import { CustomDatePicker } from '../../../components/DatePicker'
import { Table } from '../../../components/Table'
import FeedbackModal from '../../../components/FeedbackModal'

import { TrashIcon } from '../../../components/Icons'

import styles from '../styles.module.scss'

import { Product } from '../../../../db/model/Product'
import { Client } from '../../../../db/model/Client'
import { Order } from '../../../../db/model/Order'
import { OrderProduct } from '../../../../db/model/OrderProduct'
import { ProductPrice } from '../../../../db/model/ProductPrice'

import { getProducts } from '../../../services/ProductService'
import { getClients } from '../../../services/ClientService'
import { getByClientId } from '../../../services/ProductPriceService'
import { formatPrice, priceValidation } from '../../../utils/Formatter'
import { insertOrder } from '../../../services/OrderService'
import { insertOrderProductList } from '../../../services/OrderProductService'

const inititalState = {
  id: '',
  clientId: '',
  orderDate: new Date().toISOString(),
  deliveryDate: new Date().toISOString(),
  totalPrice: 0,
  discount: 0,
  completedOrder: false,
} as Order

const inititalOrderProductState = {
  orderId: '',
  productId: '',
  quantity: 1,
  price: 0,
  unit: '',
} as OrderProduct

function formatOrderProductList(orderProductList: OrderProduct[], render: (index: number) => JSX.Element) {
  return orderProductList.map((orderProduct, index) => [
    orderProduct.quantity.toString(),
    orderProduct.quantity.toString(),
    formatPrice(orderProduct.price),
    formatPrice(orderProduct.quantity * orderProduct.price),
    render(index),
  ])
}

function newOrder() {
  const router = useRouter()

  const [screenTexts, setScreenTexts] = useState({
    title: 'Registro de venda',
    FeedbackTitle: 'Cliente cadastrado com sucesso!',
  })
  const [order, setOrder] = useState<Order>(inititalState)
  const [orderProduct, setOrderProduct] = useState<OrderProduct>(inititalOrderProductState)

  const [orderProductList, setOrderProductList] = useState<OrderProduct[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [productsPrice, setProductsPrice] = useState<ProductPrice[]>([])

  const headers = ['Produto', 'Quantidade', 'Valor unitário', 'Valor total', 'Ações']

  useEffect(() => {
    getProducts().then(setProducts)
    getClients().then(setClients)
  }, [])

  useEffect(() => {
    setOrderProduct(inititalOrderProductState)
    if (order.clientId) {
      getByClientId(order.clientId).then((response) => {
        setProductsPrice(response)
      })
    }
  }, [order.clientId])

  useEffect(() => {
    const subTotal = getSubtotal()
    const totalPrice = subTotal > 0 && order.discount <= subTotal ? subTotal - order.discount : 0

    setOrder({ ...order, totalPrice })
  }, [orderProductList, order.discount])

  function onChangeClient(event) {
    setOrder({ ...order, clientId: event.target.value })
  }

  function onChangeOrderDate(event) {
    setOrder({ ...order, orderDate: new Date(event).toISOString() })
  }

  function onChangeDeliveryDate(event) {
    setOrder({ ...order, deliveryDate: new Date(event).toISOString() })
  }

  function onChangeProduct(event) {
    const productId = event.target.value
    let { price, unit, name } = products.find((value) => value.id === productId)

    price = productsPrice.find((value) => value.productId === productId)?.price || price

    setOrderProduct({ ...orderProduct, productId, name, price, unit })
  }

  function onChangeQuantity(value: string) {
    const quantity = Number(value.replace(/[^\d]/g, ''))
    setOrderProduct({ ...orderProduct, quantity })
  }

  function onChangeDiscount(value: string) {
    setOrder({ ...order, discount: priceValidation(value) })
  }

  function pushOrderProduct() {
    const someOrderProduct = orderProductList.some((value) => value.productId === orderProduct.productId)

    if (orderProduct.productId && orderProduct.quantity > 0 && !someOrderProduct) {
      setOrderProductList([...orderProductList, { ...orderProduct }])
      setOrderProduct(inititalOrderProductState)
    }
  }

  function popOrderProduct(index: number) {
    const clone = [...orderProductList]
    clone.splice(index, 1)

    setOrderProductList([...clone])
  }

  function registerOrder() {
    insertOrder(order).then(([orderId]) => {
      insertOrderProductList(orderProductList.map((value) => ({ ...value, orderId }))).then((response) => {})
    })
  }

  function validateForm() {
    return order.clientId && orderProductList.length > 0
  }

  function renderFirstInputContainer() {
    return (
      <div className={styles.textInputContainer}>
        <div style={{ width: '40%' }}>
          <CustomSelect value={order.clientId} items={clients} onChange={onChangeClient} label='Cliente' />
        </div>

        <div style={{ width: '30%' }}>
          <CustomDatePicker value={order.orderDate} onChange={onChangeOrderDate} label='Data de venda' />
        </div>

        <div style={{ width: '30%' }}>
          <CustomDatePicker value={order.deliveryDate} onChange={onChangeDeliveryDate} label='Data de entrega' />
        </div>
      </div>
    )
  }

  function renderSecondInputContainer() {
    return (
      <div className={styles.textInputContainer}>
        <div style={{ width: '40%' }}>
          <CustomSelect value={orderProduct.productId} items={products} onChange={onChangeProduct} label='Produto' />
        </div>

        <div style={{ width: '20%' }}>
          <TextInput
            label={`Quantidade ${orderProduct.unit ? `(${orderProduct.unit})` : ''}`}
            value={orderProduct.quantity.toString()}
            onChange={onChangeQuantity}
            feedback={{ errorMessage: 'Quantidade deve ser maior que zero' }}
            validation={(value) => Number(value.replace(/[^\d]/g, '')) > 0}
          />
        </div>

        <div style={{ width: '20%' }}>
          <TextInput label='Valor' value={formatPrice(orderProduct.price)} disabled />
        </div>

        <div style={{ width: '20%' }}>
          <TextInput label='Valor Total' value={formatPrice(orderProduct.quantity * orderProduct.price)} disabled />
        </div>
      </div>
    )
  }

  function renderOrderProductTable() {
    if (orderProductList.length > 0) {
      return (
        <Table
          headers={headers}
          bodies={formatOrderProductList(orderProductList, (index: number) => (
            <button
              onClick={() => {
                popOrderProduct(index)
              }}
            >
              <TrashIcon />
            </button>
          ))}
        />
      )
    }
  }

  function getSubtotal() {
    return orderProductList.reduce((prevValue, value) => {
      return prevValue + value.price * value.quantity
    }, 0)
  }

  function renderFooterButtons() {
    return (
      <div className={styles.buttonContainer}>
        <Button onClick={registerOrder} disabled={!validateForm()}>
          Cadastrar
        </Button>
        <Link href='/order'>
          <a className={styles.cancel}>Cancelar</a>
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Registro de venda - Neoplast</title>
      </Head>

      <div className={styles.newOrderContainer}>
        <div className={styles.title}>
          <h2>{screenTexts.title}</h2>
        </div>

        {renderFirstInputContainer()}

        {renderSecondInputContainer()}

        <a className={styles.addProduct} onClick={pushOrderProduct}>
          + Adicionar produto
        </a>

        {renderOrderProductTable()}

        <span className={styles.subtotal}>
          <label>Subtotal</label>
          <p>{formatPrice(getSubtotal())}</p>
        </span>

        <div className={styles.discountContainer}>
          <TextInput
            style={{ width: 300, marginBottom: 24 }}
            label='Desconto'
            value={formatPrice(order.discount)}
            onChange={onChangeDiscount}
          />
          <span className={styles.spacing} />
          <span className={styles.total}>
            <label>Total</label>
            <p>{formatPrice(order.totalPrice)}</p>
          </span>
        </div>

        {renderFooterButtons()}
      </div>
    </React.Fragment>
  )
}

export default newOrder
