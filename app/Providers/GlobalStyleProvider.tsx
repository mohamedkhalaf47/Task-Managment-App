import React from 'react'

interface Props {
  children: React.ReactNode
}

const GlobalStyleProvider = ( {children }: Props ) => {
  return (
    <div className='p-4 flex gap-4 h-full duration-300 md:p-10 md:gap-10'>
      {children}
    </div>
  )
}


export default GlobalStyleProvider