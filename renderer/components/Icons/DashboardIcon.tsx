import React from 'react'

function DashboardIcon({ fill = '#2A9BD7', ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={25} height={27} viewBox='0 0 25 27' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        d='M3.505 10.017a2.6 2.6 0 01-2.6-2.6v-3.9a2.6 2.6 0 012.6-2.601h5.2a2.6 2.6 0 012.6 2.6v3.9a2.6 2.6 0 01-2.6 2.601h-5.2zm0-2.6h5.2v-3.9h-5.2v3.9zm0 19.502a2.6 2.6 0 01-2.6-2.6V13.918a2.6 2.6 0 012.6-2.6h5.2a2.6 2.6 0 012.6 2.6v10.4a2.6 2.6 0 01-2.6 2.601h-5.2zm0-2.6h5.2V13.918h-5.2v10.4zm10.4 0a2.6 2.6 0 002.601 2.6h5.2a2.6 2.6 0 002.601-2.6v-2.6a2.6 2.6 0 00-2.6-2.6h-5.2a2.6 2.6 0 00-2.601 2.6v2.6zm7.802 0h-5.2v-2.6h5.2v2.6zm-5.2-7.801a2.6 2.6 0 01-2.601-2.6V3.516a2.6 2.6 0 012.6-2.6h5.2a2.6 2.6 0 012.601 2.6v10.401a2.6 2.6 0 01-2.6 2.6h-5.2zm0-2.6h5.2V3.516h-5.2v10.402z'
        fill={fill}
      />
    </svg>
  )
}

export default DashboardIcon
