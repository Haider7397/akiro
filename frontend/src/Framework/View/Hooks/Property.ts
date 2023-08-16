import { useRef } from 'react'
import { BehaviorSubject } from 'rxjs'

export const useProperty = <T>(initialValue: T): BehaviorSubject<T> => {
  return useRef(new BehaviorSubject<T>(initialValue)).current
}
