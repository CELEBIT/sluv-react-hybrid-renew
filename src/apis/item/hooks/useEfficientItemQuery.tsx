import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useEfficientItemQuery = () => {
  const item = new ItemService()

  const getEfficientItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.efficientItem,
      ({ pageParam = 0 }) => item.getEfficientItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getEfficientItem }
}

export default useEfficientItemQuery
