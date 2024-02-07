import { useQuery } from '@tanstack/react-query'
import PlaceService from '../placeService'
import { queryKeys } from '../../../config/queryKeys'

const useHotPlaceQuery = () => {
  const place = new PlaceService()
  const getHotPlace = useQuery(queryKeys.hotPlace, () => place.getHotPlace())
  return { getHotPlace }
}

export default useHotPlaceQuery
