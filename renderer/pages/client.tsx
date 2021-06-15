import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from '../components/Button'
import { SearchInput } from '../components/SearchInput'
import { TextInput } from '../components/TextInput'
import { Table } from '../components/Table'
import { PageControl } from '../components/PageControl'

import { PencilIcon } from '../components/Icons'

import styles from '../styles/client.module.scss'

function Client() {
  const headers = ['Name/Razão Social', 'CPF/CNPJ', 'Telefone', 'Ações']
  const bodies = [
    ['Lindsey Stroud', '22.030.870/0001-46', '(11) 95677-2833', renderActTable()],
    ['Lindsey Stroud', '22.030.870/0001-46', '(11) 95677-2833', renderActTable()],
  ]

  function renderActTable() {
    return (
      <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'space-between' }}>
        <a style={{ color: '#1EA9F3', textDecoration: 'underline' }}>Ver endereço</a>
        <PencilIcon />
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
          <SearchInput value='client' onChange={(value) => console.log(value)} />
          <Button onClick={() => console.log('add client')}>Adicionar novo cliente</Button>
        </div>
        <div className={styles.tableContainer}>
          <PageControl back={() => console.log('back')} next={() => console.log('next')} />
          <Table headers={headers} bodies={bodies} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Client
