import { useMutation, useQueryClient } from '@tanstack/react-query'
import PlaceService from '../placeService'
import { queryKeys } from '../../../config/queryKeys'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'

interface IPostItemPlace {
  placeName: string
}

const usePostPlaceQuery = () => {
  const place = new PlaceService()
  const queryClient = useQueryClient()
  const { closeModal } = useModals()
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const postItemPlace = useMutation(
    ({ placeName }: IPostItemPlace) => place.postItemPlace(placeName),
    {
      onMutate: async ({ placeName }) => {
        return { placeName }
      },
      onSuccess: (data, variables, context) => {
        closeModal(modals.ItemPlaceInputModal, () => {
          queryClient.invalidateQueries(queryKeys.recentPlace)
          if (context?.placeName)
            setItemInfo({
              ...itemInfo,
              whereDiscovery: context?.placeName,
            })
        })
      },
    },
  )
  return { postItemPlace }
}

export default usePostPlaceQuery
