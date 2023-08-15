import { combineEpics } from 'redux-observable'
import { authenticationEpics } from './Authentication/'


export const Epics = combineEpics(authenticationEpics)