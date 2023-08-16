import { filter, mergeMap, of } from 'rxjs'
import { catchError, retryWhen } from 'rxjs/operators'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { Epic } from '../../../index'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'

export const GetAllTokenEpic: Epic = (action$, _, { TokenRepository, [tokenSlice.name]: token }) =>
action$.pipe(
  filter(token.GetAllTokenRequest.match),
  mergeMap((action: any) =>
  TokenRepository.getAllTokens(action.payload).pipe(
      mergeMap((response) => {
        if (response instanceof Error) {
          throw response
        }
        return of(token.GetAllTokenSuccess(response))
      }),
      retryWhen(serverIsNotAvailable()),
      catchError((error) => of(token.GetAllTokenFailure({ error }))),
    ),
  ),
)