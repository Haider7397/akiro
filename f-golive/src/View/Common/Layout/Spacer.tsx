import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

const spacer = cva('py-12', {
  variants: {},
})

interface IProps extends PropsWithChildren, VariantProps<typeof spacer> {
}

export const Spacer = ({ children }: IProps) => {
  return (
    <div className={spacer({})}>
      {children}
    </div>
  )
}