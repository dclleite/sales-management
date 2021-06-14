import React from 'react'

import styles from './styles.module.scss'

import { Back, Next } from '../Icons'

interface PageControlProps {
  currentPage: number
  totalPages: number
  back: () => void
  next: () => void
}

export function PageControl({ currentPage = 1, totalPages = 1, back, next }: PageControlProps) {
  return (
    <div className={styles.pageControlContainer}>
      <p>
        {currentPage}/{totalPages}
      </p>
      <button onClick={back}>
        <Back />
      </button>
      <button onClick={next}>
        <Next />
      </button>
    </div>
  )
}
