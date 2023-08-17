import { useSelector } from '../../..'
import { State } from '../../../Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetTotalValid = () => {
  return useSelector(getTotalValid)
}

export const getTotalValid = (state: typeof State) => state[tokenSlice.name].valid
