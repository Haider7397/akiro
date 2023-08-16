import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactNode } from 'react'
import { Heading } from '../Heading/Heading';



const box = cva('relative p-3 sm:p-6 md:p-12 border border-gray-300 rounded-2xl bg-white shadow-lg h-full flex flex-col max-w-6xl', {
  variants: {},
})

interface IProps extends VariantProps<typeof box>, PropsWithChildren {
  title?: string;
  action?: ReactNode;
}

export const Box = ({ children, title, action }: IProps) => {
  return (
    <div className={box({})}>
      {title && <>
        <Heading>{title}</Heading>
        <hr />
      </>
      }
      <div className='flex-grow'>
        {children}
      </div>
      <div className={'flex flex-row-reverse justify-between content-end'}>{action}</div>
    </div>
  )
}