import { useSelector } from '../../..'
import { State } from '../../../Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetTokenStatus = () => {
  return useSelector(getTokenStatus)
}

export const getTokenStatus = (state: typeof State) => state[tokenSlice.name].tokenStatus
