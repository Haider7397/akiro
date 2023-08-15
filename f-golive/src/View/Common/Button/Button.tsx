import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { Subject } from 'rxjs'

const button = cva('py-0.5 px-12 md:px-14 my-2 rounded shadow focus:outline-primary outline-offset-2 outline-1 transition-color duration-200 disabled:opacity-75 disabled:cursor-not-allowed', {
  variants: {
    variant: {
      primary: 'bg-primary hover:bg-primary-600 text-font-contrast uppercase',
      ghost: 'bg-transparent shadow-none px-0 md:px-0 focus:outline-font-default hover:underline',
      cancel: 'bg-secondary hover:bg-secondary-600 text-font-contrast uppercase',
    },
    size: {
      xs: 'py-1',
      sm: 'py-2',
      md: 'py-3',
      lg: 'py-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface IProps extends PropsWithChildren, VariantProps<typeof button> {
  onClick$?: Subject<void>;
  isDisabled?: boolean;
}

export const Button = ({ variant, size, children, onClick$, isDisabled }: IProps) => {
  return (
    <button
      className={button({ variant, size })}
      onClick={() => onClick$ && onClick$?.next()}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}