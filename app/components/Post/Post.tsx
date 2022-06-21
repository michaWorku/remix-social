import React from 'react'
import { Props } from './types'

const Post = ({header, children} : Props) => {
  return (
    <div className='flex flex-col p-6 max-w-md border rounded'>
        {header && <h1 className='font-bold text-3xl text-gray-900'>{header}</h1>}
        <p className='mt-4 text-lg text-gray-900'>{children}</p>
    </div>
  )
}

export default Post