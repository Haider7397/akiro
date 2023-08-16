import { Epic } from '../../../../Flux'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { of } from 'rxjs'
import { catchError, filter, mergeMap, retryWhen } from 'rxjs/operators'
import { UnauthorizedError } from '../../../../Framework/Error/UnauthorizedError'
import { authenticationSlice } from '../../../Slice/Authentication/AuthenticationSlice'

export const loginEpic: Epic = (action$, _, { AuthenticationRepository, [authenticationSlice.name]: authentication }) =>
  action$.pipe(
    filter(authentication.loginRequest.match),
    mergeMap((action: any) =>
      AuthenticationRepository.authenticate(action.payload).pipe(
        mergeMap((response) => {
          if (response instanceof Error) {
            throw response
          }
          return of(authentication.loginSuccess(response))
        }),
        retryWhen(serverIsNotAvailable()),
        catchError((error) => of(authentication.loginFailure({ error }))),
      ),
    ),
)
