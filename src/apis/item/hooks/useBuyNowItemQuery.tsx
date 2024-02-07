import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useBuyNowItemQuery = () => {
  const item = new ItemService()

  const getBuyNowItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.buyNowItem,
      ({ pageParam = 0 }) => item.getBuyNowItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getBuyNowItem }
}

export default useBuyNowItemQuery
