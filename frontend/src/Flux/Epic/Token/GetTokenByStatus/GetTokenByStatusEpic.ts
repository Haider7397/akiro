import { filter, mergeMap, of } from 'rxjs'
import { catchError, retryWhen, withLatestFrom } from 'rxjs/operators'
import { serverIsNotAvailable } from '../../../../Framework/Epic/ServerNotAvailable'
import { Epic } from '../../../index'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'

export const GetTokenByStatusEpic: Epic = (action$, state$, { TokenRepository, [tokenSlice.name]: token }) =>
action$.pipe(
  filter(token.GetTokenByStatusRequest.match),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
  TokenRepository.getTokensByStatus(action.payload, state.authentication.user).pipe(
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