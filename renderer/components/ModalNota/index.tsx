import { Modal } from '../Modal'
import { Button } from '../Button'

import styles from './styles.module.scss'
import Image from 'next/image'

export interface FeedbackModalProps {
  open: boolean
  title: string
  image: React.ReactNode
  action: () => void
  buttonText: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const phone = '00 2221-0001';
const cnpj = '00.000.000/0000-00'
const address = 'Rua Nome de Algúem, 56934 - CEP 00000-000 - Nome da Cidade - NA'

const sale = {
  total: 45,
  date: new Date().toLocaleDateString(),
  clientName: 'Pedro Alvares Cabral',
  clientAddress: 'Rua Nome de Algúem, 56934 - CEP 00000-000 - Nome da Cidade - NA',
  clientCpfCnpj: '00.000.000/0000-00',
  products: [
    {
      productName: 'Sacola 1',
      unit: 'kg',
      unitPrice: 50,
      quantity: 5,
      total: 250
    }
  ]
}

function getHeader() {
  return <div className={styles.header}>
    <div className={styles.imageContainer}>
      <Image width={100} height={70} src='/images/neoplast-logo.svg' />
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

function getSaleInfo() {
  return (
    <div className={styles.info}>
      <span>Emissão: {sale.date} </span><br />
      <span>Nome: {sale.clientName} </span><br />
      <span>Endereço: {sale.clientAddress} CPF/CNPJ: {sale.clientCpfCnpj}</span>
    </div>)
}

function getProductTable() {
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
          <tr>
            <td style={{ width: '500px', textAlign: 'left' }}>
              {product.productName}
            </td>
            <td>
              {product.quantity}
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

function ModalNota({ open }: FeedbackModalProps) {
  return (
    <Modal PaperProps={{ className: styles.modal }} open={open}>
      <div className={styles.mainContainer}>
        {getHeader()}
        {getSaleInfo()}
        {getProductTable()}
      </div>
    </Modal>
  )
}

export default ModalNota
