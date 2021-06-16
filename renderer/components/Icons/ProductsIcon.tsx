import React from 'react'

function ProductsIcon({ fill = '#2A9BD7', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={31} viewBox='0 0 29 31' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.04.762L14.435.41l-.605.35-11.55 6.687L.479 8.49l.026.015v14.822l.646.336 12.912 6.714.553.287.553-.287 12.69-6.585.647-.336V8.736l.07-.04-1.784-1.044L15.04.762zm11.065 9.355l-10.287 5.917v11.302l10.287-5.338v-11.88zM2.904 9.88L13.418 15.9v11.437L2.904 21.87V9.879zm5.793.552l-3.41-1.952 9.142-5.293 3.44 2.017-9.172 5.228zm2.418 1.384l3.62 2.074 9.06-5.212-3.538-2.074-9.142 5.212z'
        fill={fill}
      />
    </svg>
  )
}

export default ProductsIcon
