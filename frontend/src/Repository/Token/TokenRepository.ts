import { Environment } from '../../environment'
import { post,get } from '../../Repository'
import { Observable } from 'rxjs'
import { IToken, IUser } from '../../Model'

export const generate = (data:{ id: string; allowedDigits: string},user?:IUser): Observable<{data:IToken}> => {
    return post(`${Environment.API_URL}/token/create`, data, user)
}
export const validate = (data:{ token: string} ,user?:IUser): Observable<{data:IToken}> => {
    return post(`${Environment.API_URL}/token/validate`, data, user)
}

export const getAllTokens = (data: {userId:string}, user?: IUser): Observable<{data:IToken[],count:number,valid:number,invalid:number,unknown:number}> => {
    return get(`${Environment.API_URL}/token/getAll/${data.userId}`,data, user)
}

export const getTokensByStatus = (data: {userId:string, validityStatus:string}, user?: IUser): Observable<{data:IToken[]}> => {
    return get(`${Environment.API_URL}/token/getAll/${data.userId}/${data.validityStatus}`,data, user)
}
