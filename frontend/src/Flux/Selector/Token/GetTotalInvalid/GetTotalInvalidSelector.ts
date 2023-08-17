import { useSelector } from '../../..'
import { State } from '../../../Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetTotalInvalid = () => {
  return useSelector(getTotalInvalid)
}

export const getTotalInvalid = (state: typeof State) => state[tokenSlice.name].invalid
