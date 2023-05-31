import { useMutation, useQueryClient } from '@tanstack/react-query'
import PlaceService from '../placeService'
import { queryKeys } from '../../../config/queryKeys'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

interface IPostItemPlace {
  placeName: string
}

const usePostPlaceQuery = () => {
  const place = new PlaceService()
  const queryClient = useQueryClient()

  const postItemPlace = useMutation(
    ({ placeName }: IPostItemPlace) => place.postItemPlace(placeName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.recentPlace)
      },
    },
  )
  return { postItemPlace }
}

export default usePostPlaceQuery
