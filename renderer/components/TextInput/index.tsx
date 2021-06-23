import React, { useEffect, useRef, useState } from 'react'

import { CircleCheck, CircleError } from '../Icons'

import styles from './styles.module.scss'

export interface TextInputProps {
  name?: string
  id?: string
  value: string
  label?: string
  maxLength?: number
  feedback?: Feedback
  onChange: (value: string, inputName?: string) => void
  onBlur?: (value: string, isInputValid: boolean) => void
  onFocus?: () => void
  validation?: (value: string) => boolean
  required?: boolean
  disabled?: boolean
  style?: React.CSSProperties
}

interface Feedback {
  tipMessage?: string
  errorMessage?: string
}

export function TextInput({
  value,
  name,
  id,
  label,
  maxLength,
  feedback,
  onChange,
  onBlur,
  onFocus,
  validation,
  required = false,
  disabled = false,
  style = {},
}: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [isInputValid, setIsInputValid] = useState(true)
  const [isFocus, setIsFocus] = useState(false)

  const [successfulFeedback, setSuccessfulFeedback] = useState(false)
  const [failureFeedback, setFailureFeedback] = useState(false)

  useEffect(() => {
    if (value.length > 0 && !isFocus && validation && isInputValid) {
      setSuccessfulFeedback(true)
      setFailureFeedback(false)
    } else if (!isInputValid && (validation || required)) {
      setFailureFeedback(true)
      setSuccessfulFeedback(false)
    } else {
      setFailureFeedback(false)
      setSuccessfulFeedback(false)
    }
  }, [isFocus, isInputValid])

  function renderIcon() {
    if (successfulFeedback) {
      return (
        <div className={styles.icon}>
          <CircleCheck />
        </div>
      )
    } else if (failureFeedback) {
      return (
        <div className={styles.icon}>
          <CircleError />
        </div>
      )
    }
    return <div className={styles.icon}></div>
  }

  function renderFeedback() {
    if (feedback) {
      if (!isInputValid && (validation || required)) {
        return (
          <span className={`${styles.feedback} ${styles.errorFeedback}`}>
            {feedback.errorMessage || 'Campo inválido'}
          </span>
        )
      } else if (feedback.tipMessage) {
        return <span className={`${styles.feedback} ${styles.tipFeedback}`}>{feedback.tipMessage}</span>
      }
    }
  }

  function getStyleInputContainer() {
    if (successfulFeedback) {
      return styles.inputContainerSuccessful
    } else if (failureFeedback) {
      return styles.inputContainerFailure
    }

    return ''
  }

  return (
    <div className={styles.textInputContainer} style={{ ...style }}>
      <label className={styles.label}>{label}</label>
      <div className={`${styles.inputContainer} ${getStyleInputContainer()}`}>
        <input
          ref={ref}
          className={styles.input}
          type='text'
          name={name}
          id={id}
          value={value}
          maxLength={maxLength}
          onChange={(event) => {
            onChange(event.target.value, event.target.name)
          }}
          onBlur={(event) => {
            let newIsInputValid = true
            if (required) {
              newIsInputValid = value.length > 0
            }
            if (newIsInputValid && value.length > 0 && validation) {
              newIsInputValid = validation(value)
            }
            setIsInputValid(newIsInputValid)
            setIsFocus(false)
            onBlur && onBlur(value, newIsInputValid)
          }}
          onFocus={() => {
            setIsFocus(true)
            setIsInputValid(true)
            onFocus && onFocus()
          }}
          disabled={disabled}
          required={required}
        />
        {renderIcon()}
      </div>
      {renderFeedback()}
    </div>
  )
}
