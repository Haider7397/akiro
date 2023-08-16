import React, { PropsWithChildren, ReactNode } from 'react'

export interface IFormControlProps extends PropsWithChildren {
  className?: string;
}

export const FormControl = ({ children }: IFormControlProps) => {
  return (
    <div className='p-2 w-full flex flex-row gap-2'>
      <div className='flex-grow flex-row flex-wrap'>
        {children}
      </div>
    </div>
  )
}
