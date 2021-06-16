import React from 'react'

function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={15} viewBox='0 0 8 15' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M6.734 14.618a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1.001 1.001 0 111.54 1.28l-4.47 5.36 4.32 5.36a1 1 0 01-.78 1.64z'
        fill='#727272'
      />
    </svg>
  )
}

export default BackIcon
