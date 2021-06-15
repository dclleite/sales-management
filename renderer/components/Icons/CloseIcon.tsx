import React from 'react'

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={26} height={27} viewBox='0 0 26 27' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M14.527 13.864l4.659-4.648a1.088 1.088 0 00-1.539-1.538L13 12.336 8.352 7.678a1.088 1.088 0 10-1.538 1.538l4.658 4.648-4.658 4.647a1.084 1.084 0 000 1.539 1.084 1.084 0 001.538 0L13 15.39l4.647 4.659a1.084 1.084 0 001.539 0 1.084 1.084 0 000-1.539l-4.659-4.647z'
        fill='#7C7C7C'
      />
    </svg>
  )
}

export default CloseIcon
