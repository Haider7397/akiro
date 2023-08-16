import { Epic } from '../../../../Flux'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { of } from 'rxjs'
import { catchError, filter, mergeMap, retryWhen } from 'rxjs/operators'
import { tokenSlice } from '../../../Slice/Token/TokenSlice'

export const ValidateTokenEpic: Epic = (action$, _, { TokenRepository, [tokenSlice.name]: token }) =>
  action$.pipe(
    filter(token.ValidateTokenRequest.match),
    mergeMap((action: any) =>
    TokenRepository.validate(action.payload).pipe(
        mergeMap((response) => {
          if (response instanceof Error) {
            throw response
          }
          return of(token.ValidateTokenSuccess({ data: response }))
        }),
        retryWhen(serverIsNotAvailable()),
        catchError((error) => of(token.ValidateTokenFailure({ error }))),
      ),
    ),
)
