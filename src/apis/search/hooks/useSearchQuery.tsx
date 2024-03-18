import React from 'react'
import SearchService, { SearchQuestionResult } from '../searchService'
import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { UserResult } from '../../item/itemService.type'
import { IUserResult } from '../../user/userService'

const useSearchQuery = () => {
  const search = new SearchService()

  const searchTotal = (keyword: string) => {
    return useQuery(queryKeys.searchTotal(keyword), () => search.searchTotal(keyword))
  }

  const searchCommunity = (
    keyword: string,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchQuestionResult>, any> => {
    console.log(keyword)
    return useInfiniteQuery(
      queryKeys.searchCommunity(keyword),
      ({ pageParam = 0 }) => search.searchCommunity(keyword, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const searchUser = (
    keyword: string,
  ): UseInfiniteQueryResult<GetPaginationResult<IUserResult>, any> => {
    console.log(keyword)
    return useInfiniteQuery(
      queryKeys.searchUser(keyword),
      ({ pageParam = 0 }) => search.searchUser(keyword, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  return { searchTotal, searchCommunity, searchUser }
}

export default useSearchQuery
