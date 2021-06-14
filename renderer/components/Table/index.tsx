import React from 'react'

import styles from './styles.module.scss'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[]
  bodies: (string | JSX.Element)[][]
}

export function Table({ headers, bodies, ...rest }: TableProps) {
  return (
    <table className={styles.tableContainer} {...rest}>
      <thead>
        <tr className={styles.teste}>
          {headers.map((value) => (
            <th key={value}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodies.map((trValue, index) => (
          <tr key={`trKey${index}`}>
            {trValue.map((tdValue) => (
              <td key={`${tdValue}`}>{tdValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
