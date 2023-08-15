import { ChangeEvent, useCallback } from 'react'
import { Subject } from 'rxjs'


export interface ICheckboxProps {
  onChange$: Subject<boolean>
  isDisabled?: boolean
  onFocus$?: Subject<void>
  onBlur$?: Subject<void>
  label: string;
}

export const Checkbox = ({
                           onChange$,
                           onBlur$,
                           onFocus$,
                           label,
                         }: ICheckboxProps) => {

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange$.next(e.target.checked)
  }

  const handleOnBlur = useCallback(() => {
    onBlur$ && onBlur$.next()
  }, [onBlur$])

  const handleOnFocus = useCallback(() => {
    onFocus$ && onFocus$.next()
  }, [onFocus$])

  return (
    <div className='flex items-center'>
      <input id='checked-checkbox' type='checkbox' value=''
             className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-black-500 dark:focus:ring-blue-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-[#000000]'
             onChange={handleOnChange}
             onBlur={handleOnBlur}
             onFocus={handleOnFocus}
      />
      <label htmlFor='checked-checkbox' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-base'>{label}</label>
    </div>
  )

}