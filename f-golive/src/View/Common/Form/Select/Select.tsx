import { cva, VariantProps } from 'class-variance-authority'
import { useCallback, useState } from 'react'
import { BehaviorSubject } from 'rxjs'


const select = cva('border border-gray-400 hover:border-gray-500 rounded-lg px-4 py-0.5 sm:py-1 mt-2 bg-font-contrast text-font-default focus:outline-primary outline-offset-2 outline-1 w-full', {
  variants: {},
})

export interface ISelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ISelectProps extends VariantProps<typeof select> {
  onChange$: BehaviorSubject<string>
  options: ISelectOption [],
  initialValue?: string;
  isValid?: boolean;
  disabled?: boolean
}


export const Select = ({ options, onChange$, initialValue = '', isValid, disabled }: ISelectProps) => {
  //! State
  const [value, setValue] = useState(initialValue)

  //! Callbacks
  const handleOnChange = useCallback(
    (event: any) => {
      onChange$ && onChange$.next(event.target.value)
      setValue(event.target.value)
    },
    [onChange$],
  )

  return (
    <select className={select({})} onChange={handleOnChange} value={value}
            color={isValid === true ? 'success' : isValid === false ? 'error' : 'primary'} disabled={disabled}>
      {options.map((child, index) => (
        <option value={child.value} key={`${index}_${child.value}`} disabled={child.disabled}>{child.label}</option>
      ))}
    </select>
  )
}

