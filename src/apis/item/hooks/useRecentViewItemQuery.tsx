import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { RecentViewItemResult } from '../itemService.type'

const useRecentViewItemQuery = () => {
  const item = new ItemService()

  const getRecentViewItem = (): UseInfiniteQueryResult<
    GetPaginationResult<RecentViewItemResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.recentViewItem,
      ({ pageParam = 0 }) => item.getRecentViewItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getRecentViewItem }
}

export default useRecentViewItemQuery
