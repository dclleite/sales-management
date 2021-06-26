import { Select, MenuItem } from '@material-ui/core';
import React from 'react'
import styles from './styles.module.scss'

interface ISelectProps {
  items: any[],
  keyProp?: string,
  titleProp?: string,
  label: string,
  onChange: (event: any) => void,
  style?: any,
  value: any
}

export function CustomSelect({ items, keyProp = 'id', titleProp = 'name', onChange, label, style = {}, value = '' }: ISelectProps) {
  function getValue() {
    const selected = items.find(item => item[keyProp] ?? item === value[keyProp] ?? value)
    return selected[keyProp] ?? selected
  }
  return (
    <div className={styles.custmSelectContainer} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label className={styles.label} >{label}</label>
      <div className={styles.selectContainer}>
        <Select value={getValue()} className={styles.select} onChange={onChange} label="texto" disableUnderline>
          {items.map(item => <MenuItem key={item[keyProp] ?? item} value={item}>{item[titleProp] ?? item}</MenuItem>)}
        </Select>
      </div>
    </div>
  )

}
