import { useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'

export const useObservable = <T>(initialValue: T) => {
  const subject = useRef(new Subject<T>()).current
  const [value, setValue] = useState<T>(initialValue)
  const [error, setError] = useState<Error>()
  useEffect(() => {
    const subscription = subject.subscribe({ next: setValue, error: setError })
    return () => {
      subscription.unsubscribe()
      subject.complete()
    }
  }, [subject, initialValue])
  return [subject, value, error] as const
}
