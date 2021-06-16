import React from 'react'

function CircleError(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={22} height={23} viewBox='0 0 22 23' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11.027 3.098a8.778 8.778 0 100 17.555 8.778 8.778 0 000-17.555zM.055 11.875C.055 5.815 4.967.903 11.027.903S22 5.815 22 11.875s-4.912 10.972-10.972 10.972S.055 17.935.055 11.875zM6.411 7.26a1.097 1.097 0 011.552 0l3.064 3.065 3.065-3.065a1.096 1.096 0 111.551 1.552l-3.065 3.064 3.065 3.065a1.097 1.097 0 01-1.551 1.551l-3.065-3.064-3.064 3.064A1.097 1.097 0 016.41 14.94l3.065-3.065L6.41 8.811a1.097 1.097 0 010-1.552z'
        fill='#EA4E3F'
      />
    </svg>
  )
}

export default CircleError
