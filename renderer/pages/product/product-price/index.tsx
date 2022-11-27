import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getProductById } from '../../../services/ProductService'
import { getByProductId, insert, update } from '../../../services/ProductPriceService'

import { Product } from '../../../../db/model/Product'
import { FormattedProductPrice, ProductPrice as ProductPriceModel } from '../../../../db/model/ProductPrice'

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
import { CustomSelect } from '../../../components/CustomSelect'
import { getAvailableClients } from '../../../services/ClientService'

const PRICES_PER_PAGE = 10

const initialProductState = {
  name: '',
  unit: 'kg',
  price: 0,
}

const initialCurrentPrice = {
  id: '',
  clientId: '',
  clientName: '',
  clientCpfCnpj: '',
  productId: '',
  productName: '',
  unit: '',
  price: 0,
} as FormattedProductPrice

const initialNewProductPriceState = {
  id: '',
  clientId: '',
  productId: '',
  price: 0,
} as ProductPriceModel

interface PricesSearch {
  productPrices: FormattedProductPrice[]
  totalPages: number
  searchedName: string
}

function formatPricesToTable(prices: FormattedProductPrice[], render: (client: FormattedProductPrice) => JSX.Element) {
  return prices.map((price) => [
    price.clientName,
    price.clientCpfCnpj,
    price.unit,
    `${formatPrice(price.price) ?? ''}`,
    render(price),
  ])
}

function getPricesByPage(page: number, productId: string, searchClientName?: string): Promise<PricesSearch> {
  return getByProductId(productId, searchClientName ? `%${searchClientName}%` : '').then((prices) => {
    const startIndex = (page - 1) * PRICES_PER_PAGE
    const pagePrices = prices.slice(startIndex, startIndex + PRICES_PER_PAGE)
    return {
      productPrices: pagePrices,
      totalPages: Math.ceil(prices.length / PRICES_PER_PAGE),
      searchedName: searchClientName,
    }
  })
}

function ProductPrice() {
  const router = useRouter()

  const { productId } = router.query

  const [product, setProduct] = useState<Product>(initialProductState)
  const [productPrices, setProductPrices] = useState<FormattedProductPrice[]>([])
  const [availableClients, setAvailableClients] = useState<Client[]>([])

  const [newProductPrice, setNewProductPrice] = useState<ProductPriceModel>(initialNewProductPriceState)
  const [currentPriceProduct, setCurrentPriceProduct] = useState<FormattedProductPrice>(initialCurrentPrice)

  const [searchClientName, setSearchClientName] = useState('')
  const [searchedClientName, setSearchedClientName] = useState('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [openModalEditPrice, setOpenModalEditPrice] = useState(false)
  const [openModalNewPrice, setOpenModalNewPrice] = useState(false)

  const headers = ['Name/Razão Social', 'CPF/CNPJ', 'Unidade', 'Valor', 'Ações']

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

  function addNewProductPrice() {
    if (validateNewPrice()) {
      insert(newProductPrice).then(() => {
        setOpenModalNewPrice(false)
        setNewProductPrice(initialNewProductPriceState)
        getPricesByPage(page, productId.toString(), searchedClientName).then((pricesSearch) => {
          if (pricesSearch.productPrices.length > 0) {
            setProductPrices(pricesSearch.productPrices)
            setSearchedClientName(pricesSearch.searchedName)
          }
        })
      })
    }
  }

  function updateProductPrice() {
    if (currentPriceProduct.price > 0) {
      update({
        id: currentPriceProduct.id,
        clientId: currentPriceProduct.clientId,
        productId: currentPriceProduct.productId,
        price: currentPriceProduct.price,
      }).then(() => {
        setOpenModalEditPrice(false)
        setCurrentPriceProduct(initialCurrentPrice)
        getPricesByPage(page, productId.toString(), searchedClientName).then((pricesSearch) => {
          if (pricesSearch.productPrices.length > 0) {
            setProductPrices(pricesSearch.productPrices)
            setSearchedClientName(pricesSearch.searchedName)
          }
        })
      })
    }
  }

  function nextPage() {
    if (lastPage > 1) {
      const newPage = page + 1
      getPricesByPage(newPage, productId.toString(), searchedClientName).then((pricesSearch) => {
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
      getPricesByPage(newPage, productId.toString(), searchedClientName).then((pricesSearch) => {
        if (pricesSearch.productPrices.length > 0) {
          setProductPrices(pricesSearch.productPrices)
          setPage(newPage)
          setSearchedClientName(pricesSearch.searchedName)
        }
      })
    }
  }

  function onChangeNewProductPrice(event: any) {
    setNewProductPrice({ ...newProductPrice, clientId: event.target.value })
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

  function renderInputsProduct() {
    return (
      <div className={styles.productInputContainer}>
        <div style={{ width: '50%' }}>
          <TextInput label='Produto' value={product.name} disabled />
        </div>

        <div style={{ width: '25%' }}>
          <TextInput label='Unidade' value={product.unit} disabled />
        </div>

        <div style={{ width: '25%' }}>
          <TextInput label='Preço' value={formatPrice(product.price)} disabled />
        </div>
      </div>
    )
  }

  function renderModalFooter(onClick: () => void, cancel: () => void, buttonDisabled?: boolean) {
    return (
      <div className={styles.buttonContainer}>
        <Button onClick={onClick} disabled={buttonDisabled}>
          Salvar
        </Button>
        <a className={styles.cancel} onClick={cancel}>
          Cancelar
        </a>
      </div>
    )
  }

  function renderModalNewPrice() {
    return (
      <Modal open={openModalNewPrice}>
        <div className={styles.modalEditPriceContainer}>
          <div className={styles.titleContainer}>
            <h2>Novo preço</h2>
          </div>

          {renderInputsProduct()}

          <CustomSelect
            label='Cliente'
            value={newProductPrice.clientId}
            items={availableClients}
            onChange={onChangeNewProductPrice}
          />

          <TextInput
            label='Preço'
            value={formatPrice(newProductPrice.price)}
            onChange={(value) => {
              setNewProductPrice({ ...newProductPrice, price: priceValidation(value) })
            }}
            validation={(value) => {
              return priceValidation(value) > 0
            }}
            feedback={{
              errorMessage: 'Preço precisa ser maior que 0',
            }}
            required
          />

          {renderModalFooter(
            addNewProductPrice,
            () => {
              setNewProductPrice(initialNewProductPriceState)
              setOpenModalNewPrice(false)
            },
            !validateNewPrice()
          )}
        </div>
      </Modal>
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

          {renderInputsProduct()}

          <TextInput
            label='Novo preço'
            value={formatPrice(currentPriceProduct.price)}
            onChange={(value) => {
              setCurrentPriceProduct({ ...currentPriceProduct, price: priceValidation(value) })
            }}
            validation={(value) => {
              return priceValidation(value) > 0
            }}
            feedback={{
              errorMessage: 'O novo valor precisa ser maior que 0',
            }}
          />
          {renderModalFooter(
            updateProductPrice,
            () => {
              setOpenModalEditPrice(false)
            },
            currentPriceProduct.price <= 0
          )}
        </div>
      </Modal>
    )
  }

  function validateNewPrice() {
    return newProductPrice.price > 0 && Boolean(newProductPrice.clientId) && Boolean(newProductPrice.productId)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Preços - Neoplast</title>
      </Head>
      <div className={styles.productPriceContainer}>
        <div className={styles.title}>
          <h2>Preços - {product.name}</h2>
        </div>
        <div className={styles.header}>
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
          <Button
            onClick={() => {
              getAvailableClients(product.id).then((response) => {
                if (response.length > 0) {
                  setNewProductPrice({ ...newProductPrice, productId: productId.toString() })
                  setAvailableClients(response)
                  setOpenModalNewPrice(true)
                }
              })
            }}
          >
            Adicionar novo preço
          </Button>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={formatPricesToTable(productPrices, renderActTable)} />
        </div>
        <a onClick={router.back} className={styles.back}>
          Voltar
        </a>
      </div>
      {renderModalEditPrice()}
      {renderModalNewPrice()}
    </React.Fragment>
  )
}

export default ProductPrice
