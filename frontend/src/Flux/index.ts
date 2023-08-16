import { Action, AnyAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as useRRDispatch, useSelector as useRRSelector } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import * as Repositories from '../Repository'
import { Observable } from 'rxjs'
import { Environment } from '../environment'
import { Epics } from './Epic'
import { Actions, Reducer, State } from './Slice'


export type TActions = typeof Actions
export type TRepositories = typeof Repositories


export default Actions

export const epicMiddleware = createEpicMiddleware<Action, Action, typeof State, TRepositories & TActions>({
  dependencies: {
    ...Actions,
    ...Repositories,
  },
})

const logger = createLogger({
  collapsed: true,
  diff: true,
})

export const Store = configureStore({
  reducer: Reducer,
  middleware: [epicMiddleware as any, logger],
  devTools: Environment.ENVIRONMENT === 'development',
})

export type AppDispatch = typeof Store.dispatch

export type Epic = (
  actions$: Observable<AnyAction>,
  state$: Observable<typeof State>,
  dependencies: TRepositories & TActions,
) => Observable<AnyAction | never>

export const useDispatch: () => AppDispatch = useRRDispatch
export const useSelector: TypedUseSelectorHook<typeof State> = useRRSelector

epicMiddleware.run(Epics)

// Utilities
interface ILoadingIdentification {
  openRequests: string[];
}

export const removeRequest = (state: ILoadingIdentification, action: Action<string>): string[] => {
  return state.openRequests.filter((type: string) => type !== action.type.replace('Failure', 'Request').replace('Success', 'Request'))
}

interface IIdentifiable {
  id: string;
}

export const removeById = <T>(arr: IIdentifiable[], id: string): T => {
  return arr.filter((element) => element.id !== id) as any
}

export const removeByIds = <T>(arr: IIdentifiable[], ids: string[]): T => {
  return arr.filter((element) => !ids.find((id) => id === element.id)) as any
}
