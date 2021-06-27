import React from 'react'
import styles from './styles.module.scss'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

interface IDatePickerProps {
  onChange: (event: any) => void,
  value: any,
  label: string
  style?: any
}

export function CustomDatePicker({ onChange, label, style = {}, value = '' }: IDatePickerProps) {
  return (
    <div className={styles.custmpickerContainer} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label className={styles.label} >{label}</label>
      <div className={styles.pickerContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={value}
            onChange={onChange}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  )

}
