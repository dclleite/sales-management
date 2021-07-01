import { Modal } from '../Modal'
import { Button } from '../Button'

import styles from './styles.module.scss'
import Image from 'next/image'
import { MouseEventHandler, useEffect, useState } from 'react'

export interface FeedbackModalProps {
  open: boolean
  sale?: SaleNote
  close: MouseEventHandler<HTMLButtonElement>
}

export interface SaleNote {
  total: number
  discount: number
  date: string
  clientName: string
  clientAddress: string
  clientCpfCnpj: string
  products: ProductNote[]
}

interface ProductNote {
  id: string
  productName: string
  unit: string
  unitPrice: number
  quantity: number
  total: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const phone = '(35) 98835-6302 / 3631-1789'
const cnpj = '10.298.109/0001-00'
const iscEstadual = '001.087.216.0076'

function getHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.imageContainer}>
        <img width={100} height={70} src='/images/neoplast-logo.svg' />
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', marginBottom: '15px', gap: 50 }}>
          <span style={{ marginRight: 'auto' }}>Telefone: {phone}</span>
          <span>CNPJ: {cnpj}</span>
        </div>
        <span>Insc. Est.: {iscEstadual}</span>
      </div>
    </div>
  )
}

function getSaleInfo(sale) {
  return (
    <div className={styles.info}>
      <span>Emissão: {sale.date} </span>
      <br />
      <span>Nome: {sale.clientName} </span>
      <br />
      <span>
        Endereço: {sale.clientAddress} CPF/CNPJ: {sale.clientCpfCnpj}
      </span>
    </div>
  )
}

function getProductTable(sale) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>P. Unit</th>
          <th>P. Total</th>
        </tr>
      </thead>
      <tbody>
        {sale.products.map((product) => (
          <tr key={product.id}>
            <td style={{ width: '500px', textAlign: 'left' }}>{product.productName}</td>
            <td>
              {product.quantity} ({product.unit})
            </td>
            <td>{formatPrice(product.unitPrice)}</td>
            <td>{formatPrice(product.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ModalNota({ open, sale, close }: FeedbackModalProps) {
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

  function renderNoteContent() {
    return (
      <>
        {getHeader()}
        {getSaleInfo(sale)}
        {getProductTable(sale)}
        <div className={styles.footer}>
          <p>Desconto: {formatPrice(sale.discount)}</p>
          <p>Valor total da nota: {formatPrice(sale.total)}</p>
        </div>
      </>
    )
  }

  return (
    <Modal PaperProps={{ className: styles.modal }} open={open}>
      {!printing && (
        <>
          <button onClick={print}>Imprimir</button>
          <button onClick={close}>Fechar</button>
        </>
      )}
      <div className={styles.mainContainer}>
        {renderNoteContent()}

        <br />
        <hr />
        <br />
        <div style={{ padding: 'none', margin: 'none', pageBreakInside: 'avoid' }}>{renderNoteContent()}</div>
      </div>
    </Modal>
  )
}

export default ModalNota
