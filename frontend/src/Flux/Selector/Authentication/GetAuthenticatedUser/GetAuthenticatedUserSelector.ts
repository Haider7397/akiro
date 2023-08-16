import { useSelector } from '../../../../Flux'
import { State } from '../../../../Flux/Slice'
import { authenticationSlice } from '../../../../Flux/Slice/Authentication/AuthenticationSlice'

export const useGetAuthenticatedUser = () => {
  return useSelector(getAuthenticatedUser)
}

export const getAuthenticatedUser = (state: typeof State) => state[authenticationSlice.name].user
