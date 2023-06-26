import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useLuxuryItemQuery = () => {
  const item = new ItemService()

  const getLuxuryItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.luxuryItem,
      ({ pageParam = 0 }) => item.getLuxuryItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getLuxuryItem }
}

export default useLuxuryItemQuery
