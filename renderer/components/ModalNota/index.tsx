import { Modal } from '../Modal'
import { Button } from '../Button'

import styles from './styles.module.scss'
import Image from 'next/image'
import { MouseEventHandler, useEffect, useState } from 'react'

export interface FeedbackModalProps {
  open: boolean
  sale?: any
  close: MouseEventHandler<HTMLButtonElement>
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const phone = '00 3221-0001';
const cnpj = '00.000.000/0000-00'
const address = 'Rua Nome de Algúem, 56934 - CEP 00000-000 - Nome da Cidade - NA'

const saleExample = {
  total: 45,
  date: new Date().toLocaleDateString(),
  clientName: 'Pedro Alvares Cabral',
  clientAddress: 'Rua Nome de Algúem, 56934 - CEP 00000-000 - Nome da Cidade - NA',
  clientCpfCnpj: '00.000.000/0000-00',
  products: [
    {
      id: '1',
      productName: 'Sacola 1',
      unit: 'kg',
      unitPrice: 50,
      quantity: 5,
      total: 250
    },
    {
      id: '2',
      productName: 'Sacola 1',
      unit: 'kg',
      unitPrice: 50,
      quantity: 5,
      total: 250
    },
  ]
}

function getHeader() {
  return <div className={styles.header}>
    <div className={styles.imageContainer}>
      <img width={100} height={70} src='/images/neoplast-logo.svg' />
    </div>
    <div style={{ flexGrow: 1 }}>
      <div style={{ display: 'flex', marginBottom: '18px', }}>
        <span style={{ marginRight: 'auto' }}>
          Telefone: {phone}
        </span>
        <span>
          CNPJ: {cnpj}
        </span>
      </div>
      <span >
        {address}
      </span>
    </div>
  </div>
}

function getSaleInfo(sale) {
  return (
    <div className={styles.info}>
      <span>Emissão: {sale.date} </span><br />
      <span>Nome: {sale.clientName} </span><br />
      <span>Endereço: {sale.clientAddress} CPF/CNPJ: {sale.clientCpfCnpj}</span>
    </div>)
}

function getProductTable(sale) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            Produto
          </th>
          <th>
            Quantidade
          </th>
          <th>
            P. Unit
          </th>
          <th>
            P. Total
          </th>
        </tr>
      </thead>
      <tbody>
        {sale.products.map(product => (
          <tr key={product.id}>
            <td style={{ width: '500px', textAlign: 'left' }}>
              {product.productName}
            </td>
            <td>
              {product.quantity} ({product.unit})
            </td>
            <td>
              {formatPrice(product.unitPrice)}
            </td>
            <td>
              {formatPrice(product.total)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ModalNota({ open, sale = saleExample, close }: FeedbackModalProps) {
  const [printing, setPrinting] = useState(false)
  function print() {
    setPrinting(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => {
        setPrinting(false)
      }, 1)
    }, 1)
  }
  return (
    <Modal PaperProps={{ className: styles.modal }} open={open}>
      {!printing && <>
        <button onClick={print}>
          Imprimir
        </button>
        <button onClick={close}>
          Fechar
        </button>
      </>

      }
      <div className={styles.mainContainer}>
        {getHeader()}
        {getSaleInfo(sale)}
        {getProductTable(sale)}
        <p>Valor total da nota: {formatPrice(sale.total)}</p>

        <br />
        <hr />
        <br />
        <div style={{ padding: 'none', margin: 'none', pageBreakInside: 'avoid' }}>
          {getHeader()}
          {getSaleInfo(sale)}
          {getProductTable(sale)}
          <p>Valor total da nota: {formatPrice(sale.total)}</p>
        </div>
      </div>
    </Modal>
  )
}

export default ModalNota
