import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from '../../../components/Button'
import FeedbackModal from '../../../components/FeedbackModal'
import { TextInput } from '../../../components/TextInput'
import styles from '../styles.module.scss'
import { saveProduct } from '../../../services/ProductService'
import Modal from '../../../components/Modal'
import { useRouter } from 'next/dist/client/router'
import BusinessAnalysis from '../../../img/BusinessAnalysis'

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const UNITS = {
  kg: 'kg',
  g: 'g',
}

function renderModal(open, close) {
  return <Modal open={open} >
    <button onClick={close}>
      fechar
    </button>
  </Modal>
}

function NewProduct() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('kg')
  const [price, setPrice] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  async function addProduct() {
    saveProduct({ name, price, unit }).then(() => setOpenModal(true))
  }

  function priceValidation(value: string) {
    const val = value.replace(/[^0-9]+/g, '')
    if (val.length === 0) {
      setPrice(0)
    } else {
      setPrice(Number.parseFloat(val) / 100)
    }
  }

  function redirect() {
    setOpenModal(false)
    router.push('/product')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Products - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}></div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <TextInput label='Produto' value={name} onChange={setName} />
          <TextInput style={{ width: '100px', marginLeft: '16px' }} label='Unidade' value={unit} onChange={setUnit} />
          <TextInput
            style={{ width: '150px', marginLeft: '16px' }}
            label='Preço'
            value={formatPrice(price)}
            onChange={priceValidation}
          />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <Button onClick={addProduct}>Cadastrar</Button>
        </div>
      </div>
      {/* {renderModal(openModal, redirect)} */}
      <FeedbackModal title='Produto cadastrado com sucesso!' image={<BusinessAnalysis />} buttonText='Ok' open={openModal} action={redirect} />
    </React.Fragment>
  )
}

export default NewProduct
