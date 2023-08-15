import { cva, VariantProps } from 'class-variance-authority'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

const textarea = cva('w-full border border-gray-400 hover:border-gray-500 rounded-lg px-4 py-0.5 sm:py-1 mt-2 bg-font-contrast text-font-default focus:outline-primary outline-offset-2 outline-1', {
  variants: {},
})

interface ITextAreaProps extends VariantProps<typeof textarea> {
  placeholder?: string;
  onChange$: BehaviorSubject<string>;
  initialValue?: string;
  isValid?: boolean;
}

export const TextArea = ({ placeholder, isValid, initialValue = '', onChange$}: ITextAreaProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const subscription = onChange$.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [onChange$])

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange$.next(event.target.value)
    },
    [onChange$]
  )

  return (
    <textarea
      className={textarea({})}
      placeholder={placeholder}
      value={value}
      rows={5}
      onChange={handleOnChange}
      color={isValid === true ? 'success' : isValid === false ? 'error' : 'primary'}
    />
  )
}