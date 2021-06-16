import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'

import { Lupa } from '../Icons'

import styles from './styles.module.scss'

export interface SearchInputtProps {
  name?: string
  id?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onClick?: () => void
}

export function SearchInput({ value, name, placeholder, id, onChange, onClick }: SearchInputtProps) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.textInputContainer}>
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          className={styles.input}
          type='text'
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
        />
        <button onClick={onClick} className={styles.icon}>
          <Lupa />
        </button>
      </div>
    </div>
  )
}
