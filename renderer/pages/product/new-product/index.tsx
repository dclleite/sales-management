import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '../../../components/Button'
import { SearchInput } from '../../../components/SearchInput'
import { TextInput } from '../../../components/TextInput'
import { Table } from '../../../components/Table'
import { PageControl } from '../../../components/PageControl'

import { PencilIcon } from '../../../components/Icons'

import styles from '../styles.module.scss'
import { getProducts, saveProduct } from '../../../services/ProductService'
import Link from 'next/link'

const PRODUCTS_PER_PAGE = 10

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}

const UNITS = {
  kg: 'kg',
  g: 'g',
}

function NewProduct() {
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('kg')
  const [price, setPrice] = useState(0)

  async function addProduct() {
    saveProduct({ name, price, unit }).then(() => alert('Produto cadastrado com sucesso'))
  }

  function priceValidation(value: string) {
    const val = value.replace(/[^0-9]+/g, '')
    if (val.length === 0) {
      setPrice(0)
    } else {
      setPrice(Number.parseFloat(val) / 100)
    }
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
    </React.Fragment>
  )
}

export default NewProduct
