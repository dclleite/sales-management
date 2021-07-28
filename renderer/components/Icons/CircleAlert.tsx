import React from 'react'

function CircleAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={56} height={56} viewBox='0 0 56 56' fill='none' {...props}>
      <path
        d='M28 51.014c12.666 0 22.934-10.269 22.934-22.935C50.934 15.413 40.666 5.145 28 5.145S5.065 15.413 5.065 28.079 15.333 51.013 28 51.013z'
        stroke='#ED9C18'
        strokeWidth={4.587}
      />
      <path d='M28 38.4v1.146m0-22.935v13.761-13.76z' stroke='#ED9C18' strokeWidth={4.587} strokeLinecap='round' />
    </svg>
  )
}

export default CircleAlert
