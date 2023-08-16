import { combineEpics } from 'redux-observable'
import { CreateTokenEpic } from './CreateToken/CreateTokenEpic'
import { ValidateTokenEpic } from './ValidateToken/ValidateTokenEpic'
import { GetAllTokenEpic } from './GetAllToken/GetAllTokenEpic'


export const tokenEpics = combineEpics(
  CreateTokenEpic,
  ValidateTokenEpic,
  GetAllTokenEpic,
)