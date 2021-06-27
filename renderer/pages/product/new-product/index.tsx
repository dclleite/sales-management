import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button } from '../../../components/Button'
import FeedbackModal from '../../../components/FeedbackModal'
import { TextInput } from '../../../components/TextInput'
import styles from '../styles.module.scss'
import { getProductById, getProducts, saveProduct, updateProduct } from '../../../services/ProductService'
import Modal from '../../../components/Modal'
import Link from 'next/link'
import { Product } from '../../../../db/model/Product'
import { CustomSelect } from '../../../components/CustomSelect'
import { saveProductStock } from '../../../services/ProductSotckService'

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const UNITS = {
  kg: 'kg',
  g: 'g',
}
const initialState = {
  name: '',
  unit: 'kg',
  price: 0,
}

function NewProduct() {
  const router = useRouter()
  const { productId, editing } = router.query

  const [product, setProduct] = useState<Product>(initialState)
  const [isEditing] = useState(router.query.editing)

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (productId) {
      getProductById(productId as string).then(setProduct)
    }
  }, [productId])

  async function addProduct() {
    if (isEditing) {
      updateProduct(product).then(() => setOpenModal(true))
    } else {
      saveProduct(product)
        .then(([id]) => {
          console.log(id)
          return saveProductStock({
            id: '',
            productId: id,
            quantity: 0,
            reservedQuantity: 0,
          })
        }
        ).then(() => setOpenModal(true))
    }
  }

  function priceValidation(value: string) {
    const val = value.replace(/[^0-9]+/g, '')
    if (val.length === 0) {
      setProduct({ ...product, price: 0 })
    } else {
      setProduct({ ...product, price: Number.parseFloat(val) / 100 })
    }
  }

  function redirect() {
    setOpenModal(false)
    router.push('/product')
  }

  function onChangeUnit(event: any) {
    setProduct({ ...product, unit: event.target.value })
  }

  function validateForm() {
    return product.price > 0 && product.name && product.unit
  }

  return (
    <React.Fragment>
      <Head>
        <title>Products - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div className={styles.header}></div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <TextInput label='Produto' value={product.name} onChange={(name) => setProduct({ ...product, name })} />
          {/* <TextInput style={{ width: '100px', marginLeft: '16px' }} label='Unidade' value={product.unit} onChange={(unit) => setProduct({ ...product, unit })} /> */}
          <CustomSelect style={{ marginLeft: '16px' }} value={product.unit} items={Object.values(UNITS)} onChange={onChangeUnit} label="Unidade" />
          <TextInput
            style={{ width: '150px', marginLeft: '16px' }}
            label='Preço'
            value={formatPrice(product.price)}
            onChange={priceValidation}
          />
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <Button disabled={!validateForm()} onClick={addProduct}>Cadastrar</Button>
          <Link href='/product'>
            <a className={styles.cancel}>{'Cancelar'}</a>
          </Link>
        </div>
      </div>
      <FeedbackModal
        title={isEditing ? 'Produto alterado com sucesso' : 'Produto cadastrado com sucesso!'}
        image={<img style={{ marginBottom: 90 }} src='/images/product-successfully-registered.svg' />}
        buttonText='Ok'
        open={openModal}
        action={redirect}
      />
    </React.Fragment>
  )
}

export default NewProduct
