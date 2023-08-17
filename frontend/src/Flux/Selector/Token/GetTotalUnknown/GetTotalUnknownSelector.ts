import { useSelector } from '../../..'
import { State } from '../../../Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetTotalUnknown = () => {
  return useSelector(getTotalUnknown)
}

export const getTotalUnknown = (state: typeof State) => state[tokenSlice.name].unknown
