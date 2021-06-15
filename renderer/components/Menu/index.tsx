import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { DashboardIcon, ClientsIcon, ProductsIcon, SalesIcon, BackupIcon } from '../Icons'

import styles from './styles.module.scss'

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.imageContainer}>
        <Image width={160} height={107} src='/images/neoplast-logo.svg' objectFit='contain' />
      </div>

      <div className={styles.buttons}>
        <Link href='/home'>
          <button>
            <DashboardIcon />
            Dashboard
          </button>
        </Link>
        <Link href='/client'>
          <button>
            <ClientsIcon />
            Clientes
          </button>
        </Link>
        <Link href='/client'>
          <button>
            <ProductsIcon />
            Produtos
          </button>
        </Link>
        <Link href='/client'>
          <button>
            <SalesIcon />
            Vendas
          </button>
        </Link>
        <Link href='/client'>
          <button>
            <BackupIcon />
            Backup
          </button>
        </Link>
      </div>
    </div>
  )
}
