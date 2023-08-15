import { cva, VariantProps } from 'class-variance-authority'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

const input = cva('w-full border border-gray-400 hover:border-gray-500 rounded-lg px-4 py-0.5 sm:py-1 mt-2 bg-font-contrast text-font-default focus:outline-primary outline-offset-2 outline-1', {
  variants: {},
})

interface IProps extends VariantProps<typeof input> {
  placeholder?: string;
  type?: 'text' | 'password';
  onChange$: BehaviorSubject<string>;
  initialValue?: string;
  isValid?: boolean;
  pattern?:string;
}

export const Input = ({ placeholder, type = 'text', isValid, initialValue = '', onChange$, pattern=''}: IProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const subscription = onChange$.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [onChange$])

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if(pattern){
        const replace = new RegExp(pattern)
        const result = event.target.value.replace(replace, '');
        onChange$.next(result)
      }else{
        onChange$.next(event.target.value)
      }
    },
    [onChange$],
  )

  return (
    <input
      className={input({})}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      color={isValid === true ? 'success' : isValid === false ? 'error' : 'primary'}
    />
  )
}

export const validatePassword = (value: string) => value.length > 5
export const validateConfirmPassword = (confirmPassword: string) => (password: string) => password === confirmPassword