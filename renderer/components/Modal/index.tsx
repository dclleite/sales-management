import React from 'react'

import { Dialog, DialogProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  paper: {
    background: '#FFFFFF',
    border: '1px solid #C7C7C7',
    boxSizing: 'border-box',
    borderRadius: 14,
  },
})

export function Modal({ children, ...rest }: DialogProps) {
  const { paper } = useStyles()
  return (
    <Dialog classes={{ paper }} {...rest}>
      {children}
    </Dialog>
  )
}
