import { useRef } from 'react'
import { Subject } from 'rxjs'

export const useInteraction = <T>(): Subject<T> => {
  return useRef(new Subject<T>()).current
}