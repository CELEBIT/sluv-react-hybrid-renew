import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import ItemService, { TempItemResult } from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

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
  return { getTempItem, deleteTempItem, deleteTempItemAll }
}

export default useTempItemQuery
