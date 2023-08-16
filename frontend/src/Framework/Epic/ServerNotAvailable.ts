import { finalize, mergeMap, Observable, throwError, timer } from 'rxjs'

export const serverIsNotAvailable =
  ({
     maxRetryAttempts = 5,
     scalingDuration = 5000,
     includedStatusCodes = [500],
   }: {
    maxRetryAttempts?: number
    scalingDuration?: number
    includedStatusCodes?: number[]
  } = {}) =>
    (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          console.error(JSON.stringify(error, null, 2))
          const retryAttempt = i + 1
          if (retryAttempt < maxRetryAttempts && includedStatusCodes.find((e) => e === error.status)) {
            console.log(`> Retrying in ${retryAttempt * scalingDuration}ms`)
            return timer(retryAttempt * scalingDuration)
          }
          return throwError(() => error)
        }),
        finalize(() => null),
      )
    }
