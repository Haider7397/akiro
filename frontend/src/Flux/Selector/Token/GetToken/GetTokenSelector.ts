import { useSelector } from '../../../../Flux'
import { State } from '../../../../Flux/Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetToken = () => {
  return useSelector(getToken)
}

export const getToken = (state: typeof State) => state[tokenSlice.name].token
