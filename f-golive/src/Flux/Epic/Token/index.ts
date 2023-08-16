import { combineEpics } from 'redux-observable'
import { CreateTokenEpic } from './CreateToken/CreateTokenEpic'
import { ValidateTokenEpic } from './ValidateToken/ValidateTokenEpic'
import { GetAllTokenEpic } from './GetAllToken/GetAllTokenEpic'
import { GetTokenByStatusEpic } from './GetTokenByStatus/GetTokenByStatusEpic'


export const tokenEpics = combineEpics(
  CreateTokenEpic,
  ValidateTokenEpic,
  GetAllTokenEpic,
  GetTokenByStatusEpic
)