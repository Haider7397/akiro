import { combineEpics } from 'redux-observable'
import { loginEpic } from './Login/LoginEpic'
import { RegisterEpic } from './Register/RegisterEpic'

export const authenticationEpics = combineEpics(
  loginEpic,
  RegisterEpic
)