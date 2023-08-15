import { authenticationSlice } from './Authentication/AuthenticationSlice'


export const Slices = [
  authenticationSlice,
] as const

export const Actions = {
  [authenticationSlice.name]: { ...authenticationSlice.actions },
}

export const State = {
  [authenticationSlice.name]: authenticationSlice.getInitialState(),
}

export const Reducer = {
  [authenticationSlice.name]: authenticationSlice.reducer,
}