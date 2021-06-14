import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { SearchInput } from '../components/SearchInput'
import { Table } from '../components/Table'
import { PageControl } from '../components/PageControl'

function Client() {
  const [state, setState] = useState({ nome: '' })

  function teste() {
    return (
      <div>
        <a onClick={() => console.log(' cliquei mexmo')}>ver mais</a>
        <p>Te</p>
      </div>
    )
  }
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div style={{ backgroundColor: '#fff', flex: 1 }}>
        <h1>Clientes</h1>
        <Button>Adicionar novo cliente</Button>
        <br />
        <div style={{ width: 300 }}>
          <TextInput
            label='Nome:'
            feedback={{
              tipMessage: 'Apenas números',
              errorMessage: 'Cpf inválido',
            }}
            value={state.nome}
            onChange={(value) => setState({ ...state, nome: value })}
            // validation={() => false}
          />
        </div>
        <br />
        <div style={{ width: 300 }}>
          <SearchInput
            value={state.nome}
            onChange={(value) => setState({ ...state, nome: value })}
            placeholder='Pesquisar produto ou cliente'
            // validation={() => false}
          />
        </div>
        <br />
        <div style={{ flex: 1 }}>
          <PageControl />
          <Table
            headers={['Test 1', 'test 2', ' teste', 'actions']}
            bodies={[
              ['body test 1', 'body test 2', 'teste', teste()],
              ['body test 1', 'body test 2', 'testando 123', teste()],
            ]}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Client
