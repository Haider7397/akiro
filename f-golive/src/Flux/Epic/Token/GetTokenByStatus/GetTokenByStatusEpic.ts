import { filter, mergeMap, of } from 'rxjs'
import { catchError, retryWhen } from 'rxjs/operators'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { Epic } from '../../../index'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'

export const GetTokenByStatusEpic: Epic = (action$, _, { TokenRepository, [tokenSlice.name]: token }) =>
action$.pipe(
  filter(token.GetTokenByStatusRequest.match),
  mergeMap((action: any) =>
  TokenRepository.getTokensByStatus(action.payload).pipe(
      mergeMap((response) => {
        if (response instanceof Error) {
          throw response
        }
        return of(token.GetTokenByStatusSuccess(response))
      }),
      retryWhen(serverIsNotAvailable()),
      catchError((error) => of(token.GetTokenByStatusFailure({ error }))),
    ),
  ),
)