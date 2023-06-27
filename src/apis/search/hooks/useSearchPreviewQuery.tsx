import React from 'react'
import SearchService, { IRecentSearch } from '../searchService'
import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'

const useSearchPreviewQuery = () => {
  const search = new SearchService()

  const getSearchKeywordPreview = (
    keyword: string,
  ): UseInfiniteQueryResult<GetPaginationResult<IRecentSearch>, any> => {
    return useInfiniteQuery(
      queryKeys.searchKeywordPreview(keyword),
      ({ pageParam = 0 }) => search.getSearchKeywordPreview(keyword, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getSearchKeywordPreview }
}

export default useSearchPreviewQuery
