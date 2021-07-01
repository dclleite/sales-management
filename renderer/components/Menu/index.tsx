import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { DashboardIcon, ClientsIcon, ProductsIcon, SalesIcon, BackupIcon } from '../Icons'

import styles from './styles.module.scss'

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.imageContainer}>
        <img width={160} height={107} src='/images/neoplast-logo.svg' />
      </div>

      <div className={styles.buttons}>
        {/* <Link href='/home'>
          <button>
            <DashboardIcon />
            Dashboard
          </button>
        </Link> */}
        <Link href='/client'>
          <button>
            <ClientsIcon />
            Clientes
          </button>
        </Link>
        <Link href='/product'>
          <button>
            <ProductsIcon />
            Produtos
          </button>
        </Link>
        <Link href='/daily-production'>
          <button>
            <ProductsIcon />
            Produção
          </button>
        </Link>
        <Link href='/order'>
          <button>
            <SalesIcon />
            Vendas
          </button>
        </Link>
        <Link href='/stock'>
          <button>
            <ProductsIcon />
            Estoque
          </button>
        </Link>
        <Link href='/backup'>
          <button>
            <BackupIcon />
            Backup
          </button>
        </Link>
      </div>
    </div>
  )
}
