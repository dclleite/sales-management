import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'

import { cellphoneMask, cepMask, cpfMask, cnpjMask } from '../../../utils/Mask'
import { validateCpf, validateCnpj, validateCellphone, validatePhone } from '../../../utils/Validators'
import { saveClient, getClient, updateClient } from '../../../services/ClientService'

import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import FeedbackModal from '../../../components/FeedbackModal'

import styles from '../styles.module.scss'
import { Client } from '../../../../db/model/Client'

const initialState: Client = {
  name: '',
  cpfCnpj: '',
  phone: '',
  email: '',
  street: '',
  streetNumber: '',
  neighborhood: '',
  cep: '',
  city: '',
  state: '',
}

function NewClient() {
  const router = useRouter()

  const [screenTexts, setScreenTexts] = useState({
    title: 'Cadastro de novo cliente',
    FeedbackTitle: 'Cliente cadastrado com sucesso!',
  })
  const [client, setClient] = useState<Client>(initialState)
  const [isEditing, setIsEditing] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { clientId, editing } = router.query

  useEffect(() => {
    if (clientId) {
      if (editing === String(true)) {
        setIsEditing(true)
        setScreenTexts({
          title: 'Edite os dados do cliente',
          FeedbackTitle: 'Dados do cliente editados com sucesso!',
        })
      } else {
        setScreenTexts({
          title: 'Informações do cliente',
          FeedbackTitle: '',
        })
      }
      getClient(clientId.toString()).then((response) => {
        if (response) {
          setClient(response)
        }
      })
    }

    return () => {
      setClient(initialState)
      setIsEditing(false)
    }
  }, [])

  function handleInput(value: string, inputName: string) {
    setClient((prevState) => ({
      ...prevState,
      [inputName]: value,
    }))
  }

  function cleanCpfCnpj(cpfCnpj: string) {
    return cpfCnpj.replace(/[^0-9]/g, '')
  }

  function validateForm() {
    if (client.name.length === 0) {
      return false
    }

    if (client.cpfCnpj.length > 0) {
      if (cleanCpfCnpj(client.cpfCnpj).length < 12 && !validateCpf(client.cpfCnpj)) {
        return false
      } else if (cleanCpfCnpj(client.cpfCnpj).length >= 12 && !validateCnpj(client.cpfCnpj)) {
        return false
      }
    }

    if (client.phone.length > 0) {
      if (client.phone.length < 15 && !validatePhone(client.phone)) {
        return false
      } else if (client.phone.length === 15 && !validateCellphone(client.phone)) {
        return false
      }
    }
    return true
  }

  function addOrUpdateClient(update: boolean = false) {
    if (validateForm()) {
      if (update) {
        updateClient(client).then(() => {
          setOpenModal(true)
        })
      } else {
        saveClient(client).then(() => {
          setOpenModal(true)
        })
      }
    }
  }

  function redirect() {
    setOpenModal(false)
    router.push('/client')
  }

  function renderFooterButtons() {
    let buttonText: 'Cadastrar' | 'Salvar' | 'Editar dados' = 'Cadastrar'
    let linkText: 'Cancelar' | 'Voltar' = 'Cancelar'

    if (clientId) {
      // prettier-ignore
      [buttonText, linkText] = isEditing ? ['Salvar', 'Cancelar'] : ['Editar dados', 'Voltar']
    }
    return (
      <div className={styles.buttonContainer}>
        <Button
          appearance={buttonText === 'Editar dados' ? 'ghost' : 'default'}
          disabled={buttonText !== 'Editar dados' && !validateForm()}
          onClick={() => {
            if (buttonText === 'Editar dados') {
              setIsEditing(true)
              setScreenTexts({
                title: 'Edite os dados do cliente',
                FeedbackTitle: 'Dados do cliente editados com sucesso!',
              })
            } else {
              addOrUpdateClient(buttonText === 'Salvar')
            }
          }}
        >
          {buttonText}
        </Button>
        <Link href='/client'>
          <a className={styles.cancel}>{linkText}</a>
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div className={styles.newClientContainer}>
        <div className={styles.title}>
          <h2>{screenTexts.title}</h2>
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='name'
            label='Nome/Razão Social'
            feedback={{ errorMessage: 'Campo obrigatório' }}
            value={client.name}
            onChange={handleInput}
            required
          />
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='cpfCnpj'
            label='CPF/CNPJ'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'CPF/CNPJ inválido' }}
            value={client.cpfCnpj}
            maxLength={18}
            onChange={(value, inputName) => {
              if (cleanCpfCnpj(value).length < 12) {
                handleInput(cpfMask(value), inputName)
              } else {
                handleInput(cnpjMask(value), inputName)
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
            disabled={Boolean(clientId) && !isEditing}
            name='phone'
            label='Telefone'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'Telefone inválido' }}
            value={client.phone}
            maxLength={15}
            onChange={(value, inputName) => {
              if (value.length > 0 && value.length < 15) {
                handleInput(cellphoneMask(value, false), inputName)
              } else {
                handleInput(cellphoneMask(value), inputName)
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
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='email'
            label='E-mail'
            value={client.email}
            onChange={handleInput}
          />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='street'
            label='Endereço'
            value={client.street}
            onChange={handleInput}
          />
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='streetNumber'
            label='Número'
            value={client.streetNumber}
            onChange={handleInput}
          />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='neighborhood'
            label='Bairro'
            value={client.neighborhood}
            onChange={handleInput}
          />
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='cep'
            label='CEP'
            feedback={{ tipMessage: 'Apenas números', errorMessage: 'CEP inválido' }}
            value={client.cep}
            maxLength={9}
            onChange={(value, inputName) => {
              handleInput(cepMask(value), inputName)
            }}
          />
        </div>

        <div className={styles.textInputContainer}>
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='city'
            label='Cidade'
            value={client.city}
            onChange={handleInput}
          />
          <TextInput
            disabled={Boolean(clientId) && !isEditing}
            name='state'
            label='Estado'
            value={client.state}
            onChange={handleInput}
          />
        </div>

        {renderFooterButtons()}
      </div>
      <FeedbackModal
        title={screenTexts.FeedbackTitle}
        image={<img src='/images/customer-successfully-registered.svg' />}
        buttonText='Ok'
        open={openModal}
        action={redirect}
      />
    </React.Fragment>
  )
}

export default NewClient
