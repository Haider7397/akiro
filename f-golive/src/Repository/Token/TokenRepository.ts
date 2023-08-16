import { Environment } from '../../environment'
import { post } from '../../Repository'
import { Observable } from 'rxjs'
import { IToken } from '../../Model'

export const generate = (data:{ id: string; allowedDigits: string }): Observable<IToken> => {
    return post(`${Environment.API_URL}/token/create`, data)
}
export const validate = (data:{ token: string;}): Observable<IToken> => {
    return post(`${Environment.API_URL}/token/validate`, data)
}