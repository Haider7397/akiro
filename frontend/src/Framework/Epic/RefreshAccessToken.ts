import { AnyAction } from '@reduxjs/toolkit'
import { Actions, State } from '../../Flux/Slice'
import { authenticationSlice } from '../../Flux/Slice/Authentication/AuthenticationSlice'
import { ofType } from 'redux-observable'
import { merge as mergeStreams, mergeMap, Observable, of, take, takeUntil } from 'rxjs'

export const refreshAccessTokenAndRetry =
  ({
     action$,
     store,
     requestAction,
     failureActionCreator,
   }: {
    action$: Observable<AnyAction>
    store: typeof State
    requestAction: any
    failureActionCreator: any
  }): ((error: any) => Observable<AnyAction> | Observable<never>) =>
    (error) =>
      error.status === 401 && store[authenticationSlice.name].user?.auth.refresh
        ? mergeStreams(
          of(
            Actions[authenticationSlice.name].refreshAccessTokenRequest({
              refreshToken: store[authenticationSlice.name].user ? store[authenticationSlice.name].user!.auth.refresh : '',
            }),
          ),
          action$.pipe(
            ofType(Actions[authenticationSlice.name].refreshAccessTokenFailure.type),
            takeUntil(action$.pipe(ofType(Actions[authenticationSlice.name].refreshAccessTokenSuccess.type))),
            take(1),
            mergeMap(() => of(failureActionCreator({ error }))),
          ),
          action$.pipe(
            ofType(Actions[authenticationSlice.name].refreshAccessTokenSuccess.type),
            takeUntil(action$.pipe(ofType(Actions[authenticationSlice.name].refreshAccessTokenFailure.type))),
            take(1),
            mergeMap(() => of(requestAction)),
          ),
        )
        : of(failureActionCreator({ error }))
