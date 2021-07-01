import React from 'react'

import styles from './styles.module.scss'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  headers: string[]
  bodies: (string | number | JSX.Element)[][]
}

export function Table({ headers, bodies, ...rest }: TableProps) {
  const cellWidth = 100 / headers.length
  return (
    <table className={styles.tableContainer} {...rest}>
      <thead>
        <tr className={styles.teste}>
          {headers.map((value, index) => (
            <th style={{ width: `${cellWidth}%` }} key={`${value}${index}`}>
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodies.map((trValue, index) => (
          <tr key={`trKey${index}`}>
            {trValue.map((tdValue, index) => (
              <td style={{ width: `${cellWidth}%` }} key={`${tdValue}${index}`}>
                {tdValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
