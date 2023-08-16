import { useEffect, useState } from 'react'
import { BehaviorSubject, pairwise } from 'rxjs'

export const useValidation = <T>(subject$: BehaviorSubject<T>, validationRule: (property: T) => boolean): boolean => {
  const [isValid, setValue] = useState<boolean>(validationRule(subject$.value))

  useEffect(() => {
    const validation$ = subject$.pipe(pairwise()).subscribe(([last, current]) => {
      const isLastValid = validationRule(last)
      const isCurrentValid = validationRule(current)
      if (isLastValid !== isCurrentValid) {
        setValue(isCurrentValid)
      }
    })
    return () => {
      validation$.unsubscribe()
    }
  }, [subject$, validationRule])

  return isValid
}
