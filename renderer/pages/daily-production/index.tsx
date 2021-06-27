import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button } from '../../components/Button'
import FeedbackModal from '../../components/FeedbackModal'
import { TextInput } from '../../components/TextInput'
import styles from './styles.module.scss'
import { getProducts } from '../../services/ProductService'
import Link from 'next/link'
import { Product } from '../../../db/model/Product'
import { DailyProduction } from '../../../db/model/DailyProduction'
import { CustomSelect } from '../../components/CustomSelect'
import { getProductionById, saveProduction, updateProduction } from '../../services/DailyProductionService'
import { CustomDatePicker } from '../../components/DatePicker'

const initialState = {
  id: '',
  productId: '',
  date: new Date().toISOString(),
  quantity: 0
}

function NewProduct() {
  const router = useRouter()
  const { productionId, editing } = router.query
  const [products, setProducts] = useState<Product[]>([])
  const [production, setProduction] = useState<DailyProduction>(initialState)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    getProducts().then(setProducts)
    if (productionId) {
      getProductionById(productionId as string).then(setProduction)
    }
  }, [productionId])

  async function addProduction() {
    if (editing) {
      updateProduction(production).then(() => setOpenModal(true))
    } else {
      saveProduction(production).then(() => setOpenModal(true))
    }
  }

  function quantityValidation(value: string) {
    const val = value.replace(/[^0-9]+/g, '')
    if (val.length === 0) {
      setProduction({ ...production, quantity: 0 })
    } else {
      setProduction({ ...production, quantity: Number.parseInt(val) })
    }
  }

  function redirect() {
    setOpenModal(false)
    setProduction(initialState)
  }

  function onChangeProduct(event: any) {
    setProduction({ ...production, productId: event.target.value })
  }

  function validateProduction() {
    return production.quantity > 0 && production.date;
  }

  function onChangeDate(event) {
    setProduction({ ...production, date: new Date(event).toISOString() })
  }

  return (
    <React.Fragment>
      <Head>
        <title>Products - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}></div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <CustomSelect value={production.productId} items={products} onChange={onChangeProduct} label="Produto" />
          <CustomDatePicker style={{ marginLeft: '16px' }} value={production.date} onChange={onChangeDate} label="Data" />
          <TextInput
            style={{ width: '150px', marginLeft: '16px' }}
            label='Quantidade'
            value={production.quantity.toString()}
            onChange={quantityValidation}
          />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <Button disabled={!validateProduction()} onClick={addProduction}>Cadastrar</Button>
          <Link href='/product'>
            <a className={styles.cancel}>{'Cancelar'}</a>
          </Link>
        </div>
      </div>
      <FeedbackModal
        title={editing ? 'Produto alterado com sucesso' : 'Produto cadastrado com sucesso!'}
        image={<img style={{ marginBottom: 90 }} src='/images/product-successfully-registered.svg' />}
        buttonText='Ok'
        open={openModal}
        action={redirect}
      />
    </React.Fragment>
  )
}

export default NewProduct
