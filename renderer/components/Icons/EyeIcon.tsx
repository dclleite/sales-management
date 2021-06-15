import React from 'react'

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={25} height={25} viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#prefix__clip0)' fill='#0B4B6D'>
        <path d='M24.348 12.363c-.215-.293-5.323-7.181-11.848-7.181S.866 12.07.652 12.363a.792.792 0 000 .934c.214.293 5.323 7.182 11.848 7.182 6.524 0 11.633-6.889 11.848-7.182a.791.791 0 000-.934zM12.5 18.896c-4.806 0-8.969-4.572-10.2-6.066 1.23-1.496 5.384-6.066 10.2-6.066 4.806 0 8.968 4.571 10.2 6.067-1.23 1.496-5.384 6.065-10.2 6.065z' />
        <path d='M12.5 8.083a4.753 4.753 0 00-4.747 4.747 4.753 4.753 0 004.747 4.747 4.753 4.753 0 004.747-4.747A4.753 4.753 0 0012.5 8.083zm0 7.912a3.168 3.168 0 01-3.165-3.165A3.168 3.168 0 0112.5 9.665a3.168 3.168 0 013.165 3.165 3.168 3.168 0 01-3.165 3.165z' />
      </g>
      <defs>
        <clipPath id='prefix__clip0'>
          <path fill='#fff' transform='translate(.5 .83)' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default EyeIcon
