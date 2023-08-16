import { PropsWithChildren } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const paragraph = cva('', {
  variants: {
    color: {
      primary: 'text-primary',
      default: 'text-font-default',
      contrast: 'text-font-contrast',
      error: 'text-font-error',

    },
    highlight: {
      bold: 'font-bold',
      none: '',
    },
  },
  defaultVariants: {
    color: 'default',
    highlight: 'none',
  },
})

interface IProps extends PropsWithChildren, VariantProps<typeof paragraph> {
}

export const Paragraph = ({ children, color }: IProps) => {
  return (
    <div className='flex justify-center items-center'>
      <p className={paragraph({ color })}>{children}</p>
    </div>
  )
}