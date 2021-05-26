import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'

function Client() {
  const [state, setState] = useState({ nome: '' })
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div style={{ backgroundColor: '#fff' }}>
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
            disabled
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Client
