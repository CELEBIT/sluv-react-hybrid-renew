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
import { localStorageKeys } from '../../../config/localStorageKeys'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentTempIdState } from '../../../recoil/itemInfo'

const useTempItemQuery = () => {
  const item = new ItemService()
  const queryClient = useQueryClient()
  const { closeModal } = useModals()

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

  const getTempCount = () => {
    return useQuery(queryKeys.getTempCount, () => item.getTempCount())
  }

  const deleteTempItem = useMutation((checkList: Array<number>) => item.deleteTempItem(checkList), {
    onSuccess: () => {
      closeModal(modals.DeleteTempItemModal, () => {
        queryClient.invalidateQueries()
        console.log('deleted')
      })
    },
  })
  const deleteTempItemAll = useMutation(() => item.deleteTempItemAll(), {
    onSuccess: () => {
      closeModal(modals.DeleteTempItemModal)
      queryClient.invalidateQueries(queryKeys.tempItem)
    },
  })

  const setCurrentTempId = useSetRecoilState(currentTempIdState)
  const postTempItem = useMutation((tempItem: TempItemReq) => item.postTempItem(tempItem), {
    onSuccess: (res) => {
      console.log(res)
      if (res?.tempItemId) {
        localStorage.setItem(localStorageKeys.TEMP_ITEM_ID, String(res?.tempItemId))
        setCurrentTempId(res?.tempItemId)
        queryClient.invalidateQueries(queryKeys.tempItem)
      }
    },
  })
  return { getTempItem, getTempCount, deleteTempItem, deleteTempItemAll, postTempItem }
}

export default useTempItemQuery
