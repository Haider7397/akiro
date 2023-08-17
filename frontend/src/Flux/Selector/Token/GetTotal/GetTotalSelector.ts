import { useSelector } from '../../..'
import { State } from '../../../Slice'
import { tokenSlice } from 'Flux/Slice/Token/TokenSlice'
export const useGetTotal = () => {
  return useSelector(getTotal)
}

export const getTotal = (state: typeof State) => state[tokenSlice.name].count
