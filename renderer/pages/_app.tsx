import React from 'react'
import type { AppProps } from 'next/app'

import { Menu } from '../components/Menu'

import styles from '../styles/app.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <Menu />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyApp
