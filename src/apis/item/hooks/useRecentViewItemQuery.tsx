import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { RecommendItemResult } from '../itemService.type'
import { SearchQuestionResult } from '../../search/searchService'

const useRecentViewItemQuery = (size?: number) => {
  const item = new ItemService()

  const getRecentViewItem = (): UseInfiniteQueryResult<
    GetPaginationResult<RecommendItemResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.recentViewItem,
      ({ pageParam = 0 }) => item.getRecentViewItem(pageParam, size),
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
