import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useRecommendHotItemQuery = () => {
  const item = new ItemService()

  const getRecommendHotItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.recommendHotItem,
      ({ pageParam = 0 }) => item.getRecommendItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getRecommendHotItem }
}

export default useRecommendHotItemQuery
