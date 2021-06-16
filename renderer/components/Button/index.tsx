import React from 'react'

import styles from './styles.module.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'default' | 'ghost'
}

export function Button({ children, appearance = 'default', ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[appearance]}`} {...rest}>
      {children}
    </button>
  )
}
