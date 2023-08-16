import { combineEpics } from 'redux-observable'
import { CreateTokenEpic } from './CreateToken/CreateTokenEpic'
import { ValidateTokenEpic } from './ValidateToken/ValidateTokenEpic'


export const tokenEpics = combineEpics(
  CreateTokenEpic,
  ValidateTokenEpic
)