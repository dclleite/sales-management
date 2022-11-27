import React, { forwardRef } from 'react'

import styles from './styles.module.scss'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'default' | 'ghost'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, appearance = 'default', ...rest }, ref) => {
    return (
      <button className={`${styles.button} ${styles[appearance]}`} ref={ref} {...rest}>
        {children}
      </button>
    )
  }
)
