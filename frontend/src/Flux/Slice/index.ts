import { tokenSlice } from './Token/TokenSlice';
import { authenticationSlice } from './Authentication/AuthenticationSlice'

export const Slices = [
  authenticationSlice,
  tokenSlice
] as const

export const Actions = {
  [authenticationSlice.name]: { ...authenticationSlice.actions },
  [tokenSlice.name]: { ...tokenSlice.actions },
}

export const State = {
  [authenticationSlice.name]: authenticationSlice.getInitialState(),
  [tokenSlice.name]: tokenSlice.getInitialState(),
}

export const Reducer = {
  [authenticationSlice.name]: authenticationSlice.reducer,
  [tokenSlice.name]: tokenSlice.reducer,
}