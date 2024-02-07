import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import SearchService, { SearchItemResult } from '../searchService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'

const useItemSearchQuery = () => {
  const search = new SearchService()

  const searchItem = (
    keyword: string,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.searchItem(keyword),
      ({ pageParam = 0 }) => search.searchItem(keyword, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { searchItem }
}

export default useItemSearchQuery
