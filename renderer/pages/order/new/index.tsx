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

const inititalState = {
  id: '',
  clientId: '',
  orderDate: new Date().toISOString(),
  deliveryDate: new Date().toISOString(),
  totalPrice: 0,
  completedOrder: false,
} as Order

const inititalOrderProductState = {
  id: '',
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

  const [discountPrice, setDiscountPrice] = useState(0)

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
        console.log(response)
      })
    }
  }, [order.clientId])

  useEffect(() => {
    setOrder({ ...order, totalPrice: orderProduct.quantity * orderProduct.price })
  }, [orderProduct.productId, orderProduct.quantity])

  function onChangeClient(event) {
    setOrder({ ...order, clientId: event.target.value })
  }

  function onChangeOrderDate(event) {
    setOrder({ ...order, orderDate: event.target.value })
  }

  function onChangeDeliveryDate(event) {
    setOrder({ ...order, deliveryDate: event.target.value })
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
    setDiscountPrice(priceValidation(value))
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
          <TextInput label='Valor Total' value={formatPrice(order.totalPrice)} disabled />
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
          <p>R$ 1.800,00</p>
        </span>

        <div className={styles.discountContainer}>
          <TextInput
            style={{ width: 300, marginBottom: 24 }}
            label='Desconto'
            value={formatPrice(discountPrice)}
            onChange={onChangeDiscount}
          />
          <span className={styles.spacing} />
          <span className={styles.total}>
            <label>Total</label>
            <p>R$ 1.600,00</p>
          </span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default newOrder
