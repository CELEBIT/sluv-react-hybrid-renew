import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { TempItemReq, TempItemResult } from '../itemService.type'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'

const useTempItemQuery = () => {
  const item = new ItemService()
  const queryClient = useQueryClient()
  const { closeModal } = useModals()
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const getTempItem = (): UseInfiniteQueryResult<GetPaginationResult<TempItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.tempItem,
      ({ pageParam = 0 }) => item.getTempItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  const deleteTempItem = useMutation((checkList: Array<number>) => item.deleteTempItem(checkList), {
    onSuccess: () => {
      closeModal(modals.DeleteTempItemModal)
      queryClient.invalidateQueries(queryKeys.tempItem)
    },
  })
  const deleteTempItemAll = useMutation(() => item.deleteTempItemAll(), {
    onSuccess: () => {
      closeModal(modals.DeleteTempItemModal)
      queryClient.invalidateQueries(queryKeys.tempItem)
    },
  })
  const postTempItem = useMutation((tempItem: TempItemReq) => item.postTempItem(tempItem), {
    onSuccess: (res) => {
      if (res?.tempItemId) {
        localStorage.setItem('tempItemId', String(res?.tempItemId))
      }
      queryClient.invalidateQueries(queryKeys.tempItem)
    },
  })
  return { getTempItem, deleteTempItem, deleteTempItemAll, postTempItem }
}

export default useTempItemQuery
