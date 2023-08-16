import { Epic } from '../../../../Flux'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { of } from 'rxjs'
import { catchError, filter, mergeMap, retryWhen, withLatestFrom } from 'rxjs/operators'
import { tokenSlice } from '../../../Slice/Token/TokenSlice'

export const CreateTokenEpic: Epic = (action$, state$, { TokenRepository, [tokenSlice.name]: token }) =>
  action$.pipe(
    filter(token.CreateTokenRequest.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
    TokenRepository.generate(action.payload, state.authentication.user).pipe(
        mergeMap((response) => {
          if (response instanceof Error) {
            throw response
          }
          return of(token.CreateTokenSuccess(response))
        }),
        retryWhen(serverIsNotAvailable()),
        catchError((error) => of(token.CreateTokenFailure({ error }))),
      ),
    ),
)
