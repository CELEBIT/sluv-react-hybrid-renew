import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PlaceService from '../placeService'
import { queryKeys } from '../../../config/queryKeys'

interface IDeleteRecentPlace {
  placeName: string
}

const useRecentPlaceQuery = () => {
  const place = new PlaceService()
  const queryClient = useQueryClient()

  const getRecentPlace = useQuery(queryKeys.recentPlace, () => place.getRecentPlace())
  const deleteRecentPlace = useMutation(
    ({ placeName }: IDeleteRecentPlace) => place.deleteRecentPlace(placeName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.recentPlace)
      },
    },
  )
  const deleteAllRecentPlace = useMutation(() => place.deleteAllRecentPlace(), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recentPlace)
    },
  })
  return { getRecentPlace, deleteRecentPlace, deleteAllRecentPlace }
}

export default useRecentPlaceQuery
