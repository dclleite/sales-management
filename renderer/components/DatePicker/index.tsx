import React from 'react'
import styles from './styles.module.scss'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={new Date().toISOString()}
            onChange={onChange}
            InputProps={{
              disableUnderline: true,
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  )

}
