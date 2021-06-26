import { Select, MenuItem } from '@material-ui/core';
import React from 'react'

interface ISelectProps {
  items: any[],
  keyProp?: string,
  titleProp?: string,
  onChange: (event: any) => void
}

function CustomSelect({ items, keyProp = 'id', titleProp = 'name', onChange }: ISelectProps) {
  console.log(items, keyProp, titleProp)

  return (
    <Select onChange={onChange}>
      {items.map(item => <MenuItem key={item[keyProp]} value={item}>{item[titleProp]}</MenuItem>)}
    </Select>
  )

}


export default CustomSelect;