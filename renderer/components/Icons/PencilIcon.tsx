import React from 'react'

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={29} viewBox='0 0 29 29' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M23.133 9.393l-3.196-3.196a2.333 2.333 0 00-3.104-.082l-10.5 10.5c-.377.38-.612.879-.665 1.412l-.501 4.865a1.167 1.167 0 001.166 1.271h.105l4.865-.443a2.333 2.333 0 001.412-.665l10.5-10.5a2.24 2.24 0 00-.082-3.162zm-12.04 11.994l-3.5.326.315-3.5 6.592-6.51 3.15 3.15-6.557 6.534zm8.074-8.097l-3.127-3.126 2.275-2.334 3.185 3.185-2.333 2.275z'
        fill='#0B4B6D'
      />
    </svg>
  )
}

export default PencilIcon
