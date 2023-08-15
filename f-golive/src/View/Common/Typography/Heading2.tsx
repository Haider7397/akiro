import { PropsWithChildren } from 'react'

export const Heading2 = ({ children }: PropsWithChildren) => {
  return (
    <h2 className='text-primary font-bold text-xl pb-2'>{children}</h2>
  )
}