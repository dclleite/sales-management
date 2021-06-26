import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { Table } from '../../components/Table'
import { PageControl } from '../../components/PageControl'
import { PencilIcon } from '../../components/Icons'

import { getClients } from '../../services/ClientService'

import { Client as ClientModel } from '../../../db/model/Client'

import styles from './styles.module.scss'

function formatCustomersToTable(clients: ClientModel[], render: (client: ClientModel) => JSX.Element) {
  return clients.map((client) => [client.name, client.cpfCnpj, client.phone, render(client)])
}

function getClientsByPage(page: number, searchName?: string): Promise<ClientsSearch> {

  return getClients(searchName ? `%${searchName}%` : '').then((clients) => {
    const startIndex = (page - 1) * CLIENTS_PER_PAGE
    const pageClients = clients.slice(startIndex, startIndex + CLIENTS_PER_PAGE)

    return {
      clients: pageClients,
      totalPages: Math.ceil(clients.length / CLIENTS_PER_PAGE),
      searchedName: searchName
    }
  })
}

interface ClientsSearch {
  clients: ClientModel[]
  totalPages: number
  searchedName: string
}

const CLIENTS_PER_PAGE = 10

function Client() {
  const [clients, setClients] = useState<ClientModel[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const headers = ['Name/Razão Social', 'CPF/CNPJ', 'Telefone', 'Ações']

  useEffect(() => {
    getClientsByPage(page).then((clientsSearch) => {
      if (clientsSearch.clients.length > 0) {
        setClients(clientsSearch.clients)
        setLastPage(clientsSearch.totalPages)
      }
    })
  }, [])

  function nextPage() {
    if(lastPage > 1) {
      const newPage = page + 1
      getClientsByPage(newPage, searchedName).then((clientsSearch) => {
        if (clientsSearch.clients.length > 0) {
          setClients(clientsSearch.clients)
          setPage(newPage)
          setSearchedName(clientsSearch.searchedName)
        }
      })
    }
   
  }

  function previousPage() {
    if (page > 1) {
      const newPage = page - 1
      getClientsByPage(newPage, searchedName).then((clientsSearch) => {
        if (clientsSearch.clients.length > 0) {
          setClients(clientsSearch.clients)
          setPage(newPage)
          setSearchedName(clientsSearch.searchedName)
        }
      })
    }
  }

  function renderActTable(client: ClientModel) {
    return (
      <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href={{
            pathname: '/client/new-client',
            query: {
              clientId: client.id,
            },
          }}
        >
          <a>Ver mais</a>
        </Link>

        <Link
          href={{
            pathname: '/client/new-client',
            query: {
              clientId: client.id,
              editing: true,
            },
          }}
        >
          <button>
            <PencilIcon />
          </button>
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div className={styles.clientContainer}>
        <div className={styles.header}>
          <SearchInput value={searchName} onChange={setSearchName} onClick={() => {
            getClientsByPage(1, searchName).then((clientsSearch) => {
              if (clientsSearch.clients.length > 0) {
                setClients(clientsSearch.clients)
                setPage(1)
                setLastPage(clientsSearch.totalPages)
                setSearchedName(clientsSearch.searchedName)
              }
            })

          }} />
          <Link href='/client/new-client'>
            <Button>Adicionar novo cliente</Button>
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={previousPage} next={nextPage} currentPage={page} totalPages={lastPage} />
          <Table headers={headers} bodies={formatCustomersToTable(clients, renderActTable)} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Client
