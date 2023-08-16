import { useSelector } from '../../../../Flux'
import { State } from '../../../../Flux/Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetAllToken = () => {
  return useSelector(getAllToken)
}

export const getAllToken = (state: typeof State) => state[tokenSlice.name].tokens
