import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getProductById } from '../../../services/ProductService'
import { getByProductId } from '../../../services/ProductPriceService'

import { Product } from '../../../../db/model/Product'
import { FormattedProductPrice } from '../../../../db/model/ProductPrice'

import { SearchInput } from '../../../components/SearchInput'
import { PageControl } from '../../../components/PageControl'
import { Table } from '../../../components/Table'
import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import { Modal } from '../../../components/Modal'
import { PencilIcon } from '../../../components/Icons'

import { formatPrice, priceValidation } from '../../../utils/Formatter'

import styles from '../styles.module.scss'
import { Client } from '../../../../db/model/Client'

const PRICES_PER_PAGE = 10

const initialProductState = {
  name: '',
  unit: 'kg',
  price: 0,
}

interface PricesSearch {
  productPrices: FormattedProductPrice[]
  totalPages: number
  searchedName: string
}

function formatPricesToTable(prices: FormattedProductPrice[], render: (client: FormattedProductPrice) => JSX.Element) {
  return prices.map((price) => [price.clientName, price.clientCpfCnpj, `${price.price ?? ''}`, render(price)])
}

function getPricesByPage(page: number, productId: string, searchClientName?: string): Promise<PricesSearch> {
  return getByProductId(productId, searchClientName ? `%${searchClientName}%` : '').then((pagePrices) => {
    return {
      productPrices: pagePrices,
      totalPages: Math.ceil(pagePrices.length / PRICES_PER_PAGE),
      searchedName: searchClientName,
    }
  })
}

function ProductPrice() {
  const router = useRouter()

  const { productId } = router.query

  const [product, setProduct] = useState<Product>(initialProductState)
  const [productPrices, setProductPrices] = useState<FormattedProductPrice[]>([])
  const [currentPriceProduct, setCurrentPriceProduct] = useState<FormattedProductPrice>({} as FormattedProductPrice)
  const [searchClientName, setSearchClientName] = useState('')
  const [searchedClientName, setSearchedClientName] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [openModalEditPrice, setOpenModalEditPrice] = useState(false)

  const headers = ['Name/Razão Social', 'CPF/CNPJ', 'Valor', 'Ações']

  useEffect(() => {
    if (productId) {
      getProductById(productId.toString()).then(setProduct)
      // getByProductId(productId.toString()).then(setProductPrices)
      getPricesByPage(page, productId.toString()).then((pricesSearch) => {
        if (pricesSearch.productPrices.length > 0) {
          setProductPrices(pricesSearch.productPrices)
          setLastPage(pricesSearch.totalPages)
        }
      })
    }
  }, [])

  function nextPage() {
    if (lastPage > 1) {
      const newPage = page + 1
      getPricesByPage(page, productId.toString(), searchedClientName).then((pricesSearch) => {
        if (pricesSearch.productPrices.length > 0) {
          setProductPrices(pricesSearch.productPrices)
          setPage(newPage)
          setSearchedClientName(pricesSearch.searchedName)
        }
      })
    }
  }

  function previousPage() {
    if (page > 1) {
      const newPage = page - 1
      getPricesByPage(page, productId.toString(), searchedClientName).then((pricesSearch) => {
        if (pricesSearch.productPrices.length > 0) {
          setProductPrices(pricesSearch.productPrices)
          setPage(newPage)
          setSearchedClientName(pricesSearch.searchedName)
        }
      })
    }
  }

  function renderActTable(price: FormattedProductPrice) {
    return (
      <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            setCurrentPriceProduct(price)
            setOpenModalEditPrice(true)
          }}
        >
          <PencilIcon />
        </button>
      </div>
    )
  }

  function renderModalEditPrice() {
    return (
      <Modal open={openModalEditPrice}>
        <div className={styles.modalEditPriceContainer}>
          <div className={styles.titleContainer}>
            <h2>Editar preço para</h2>
            <h3>{currentPriceProduct.clientName}</h3>
          </div>

          <div className={styles.productInputContainer}>
            <div style={{ width: '50%' }}>
              <TextInput label='Produto' value={product.name} />
            </div>

            <div style={{ width: '25%' }}>
              <TextInput label='Unidade' value={product.unit} />
            </div>

            <div style={{ width: '25%' }}>
              <TextInput label='Preço' value={formatPrice(product.price)} />
            </div>
          </div>
          <TextInput
            label='Novo preço'
            value={formatPrice(currentPriceProduct.price)}
            onChange={(value) => {
              setCurrentPriceProduct({ ...currentPriceProduct, price: priceValidation(value) })
            }}
          />
          <div className={styles.buttonContainer}>
            <Button>Salvar</Button>
            <a
              className={styles.cancel}
              onClick={() => {
                setOpenModalEditPrice(false)
              }}
            >
              Cancelar
            </a>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Preços - Neoplast</title>
      </Head>
      <div className={styles.productContainer}>
        <div>
          <SearchInput
            value={searchClientName}
            onChange={setSearchClientName}
            onClick={() => {
              getPricesByPage(1, productId.toString(), searchClientName).then((pricesSearch) => {
                if (pricesSearch.productPrices.length > 0) {
                  setProductPrices(pricesSearch.productPrices)
                  setPage(1)
                  setLastPage(pricesSearch.totalPages)
                  setSearchedClientName(pricesSearch.searchedName)
                }
              })
            }}
          />
        </div>
        <p>{JSON.stringify(product)}</p>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={formatPricesToTable(productPrices, renderActTable)} />
        </div>
      </div>
      {renderModalEditPrice()}
    </React.Fragment>
  )
}

export default ProductPrice
