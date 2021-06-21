import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { cellphoneMask, cepMask, cpfMask, cnpjMask } from '../../../utils/Mask'

import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'

import styles from '../styles.module.scss'

function NewClient() {
  const [name, setName] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [cep, setCep] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  function cleanCpfCnpj(cpfCnpj) {
    return cpfCnpj.replace(/[^0-9]/g, '')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div className={styles.newClientContainer}>
        <div className={styles.title}>
          <h2>Cadastro de novo cliente</h2>
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            name='name'
            label='Nome/Razão Social'
            feedback={{ errorMessage: 'Campo obrigatório' }}
            value={name}
            onChange={setName}
            required
          />
          <TextInput
            name='cpfCnpj'
            label='CPF/CNPJ'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'CPF/CNPJ inválido' }}
            value={cpfCnpj}
            maxLength={18}
            onChange={(value) => {
              if (cleanCpfCnpj(value).length < 12) {
                setCpfCnpj(cpfMask(value))
              } else {
                setCpfCnpj(cnpjMask(value))
              }
            }}
          />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            name='phone'
            label='Telefone'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'Telefone inválido' }}
            value={phone}
            maxLength={15}
            onChange={(value) => {
              setPhone(cellphoneMask(value))
            }}
          />
          <TextInput name='email' label='E-mail' value={email} onChange={setEmail} />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput name='address' label='Endereço' value={address} onChange={setAddress} />
          <TextInput name='number' label='Número' value={number} onChange={setNumber} />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput name='neighborhood' label='Bairro' value={neighborhood} onChange={setNeighborhood} />
          <TextInput
            name='cep'
            label='CEP'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'CEP inválido' }}
            value={cep}
            maxLength={9}
            onChange={(value) => {
              setCep(cepMask(value))
            }}
          />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput name='city' label='Cidade' value={city} onChange={setCity} />
          <TextInput name='state' label='Estado' value={state} onChange={setState} />
        </div>

        <div className={styles.buttonContainer}>
          <Button>Cadastrar</Button>
          <Link href='/client'>
            <a>Cancelar</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NewClient
