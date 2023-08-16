import { combineEpics } from 'redux-observable'
import { authenticationEpics } from './Authentication/'
import { tokenEpics } from './Token'


export const Epics = combineEpics(authenticationEpics,tokenEpics)