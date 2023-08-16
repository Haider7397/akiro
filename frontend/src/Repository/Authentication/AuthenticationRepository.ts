import { Environment } from '../../environment'
import { post } from '../../Repository'
import { Observable } from 'rxjs'
import { IUser } from '../../Model'


export const authenticate = (data: { email: string; password: string }): Observable<IUser> => {
    return post(`${Environment.API_URL}/auth/signin`, data)
}

export const register = (data:{ firstName: string; lastName: string; userName: string; email: string; password: string }): Observable<IUser> => {
    return post(`${Environment.API_URL}/auth/signup`, data)
}