import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'

import { cellphoneMask, cepMask, cpfMask, cnpjMask } from '../../../utils/Mask'
import { validateCpf, validateCnpj, validateCellphone, validatePhone } from '../../../utils/Validators'
import { saveClient } from '../../../services/ClientService'

import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import FeedbackModal from '../../../components/FeedbackModal'

import styles from '../styles.module.scss'

function NewClient() {
  const router = useRouter()

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

  const [openModal, setOpenModal] = useState(false)

  function cleanCpfCnpj(cpfCnpj: string) {
    return cpfCnpj.replace(/[^0-9]/g, '')
  }

  function validateForm() {
    if (name.length === 0) {
      return false
    }

    if (cpfCnpj.length > 0) {
      if (cleanCpfCnpj(cpfCnpj).length < 12 && !validateCpf(cpfCnpj)) {
        return false
      } else if (cleanCpfCnpj(cpfCnpj).length >= 12 && !validateCnpj(cpfCnpj)) {
        return false
      }
    }

    if (phone.length > 0) {
      if (phone.length < 15 && !validatePhone(phone)) {
        return false
      } else if (phone.length === 15 && !validateCellphone(phone)) {
        return false
      }
    }
    return true
  }

  function addClient() {
    if (validateForm()) {
      saveClient({
        name,
        cpfCnpj,
        phone,
        email,
        street: address,
        streetNumber: number,
        neighborhood,
        cep,
        city,
        state,
      }).then(() => {
        setOpenModal(true)
      })
    }
  }

  function redirect() {
    setOpenModal(false)
    router.push('/client')
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
            validation={(value) => {
              if (cleanCpfCnpj(value).length < 12) {
                return validateCpf(value)
              } else {
                return validateCnpj(value)
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
              if (value.length > 0 && value.length < 15) {
                setPhone(cellphoneMask(value, false))
              } else {
                setPhone(cellphoneMask(value))
              }
            }}
            validation={(value) => {
              if (value.length > 0 && value.length < 15) {
                return validatePhone(value)
              } else {
                return validateCellphone(value)
              }
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
          <Button disabled={!validateForm()} onClick={addClient}>
            Cadastrar
          </Button>
          <Link href='/client'>
            <a className={styles.cancel}>Cancelar</a>
          </Link>
        </div>
      </div>
      <FeedbackModal
        title='Cliente cadastrado com sucesso!'
        image={<img src='/images/customer-successfully-registered.svg' />}
        buttonText='Ok'
        open={openModal}
        action={redirect}
      />
    </React.Fragment>
  )
}

export default NewClient
