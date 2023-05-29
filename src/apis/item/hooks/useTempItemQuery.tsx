import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import ItemService, { TempItemResult } from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'

const useTempItemQuery = () => {
  const item = new ItemService()
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
  return { getTempItem }
}

export default useTempItemQuery
