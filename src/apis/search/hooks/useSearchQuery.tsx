import React from 'react'
import SearchService, { SearchQuestionResult } from '../searchService'
import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { UserResult } from '../../item/itemService.type'
import { IUserResult } from '../../user/userService'

const useSearchQuery = () => {
  const search = new SearchService()
  const queryClient = useQueryClient()

  const searchTotal = (keyword: string) => {
    queryClient.invalidateQueries(queryKeys.recentSearch)
    return useQuery(queryKeys.searchTotal(keyword), () => search.searchTotal(keyword))
  }

  const searchAllData = (keyword: string) => {
    return useQuery(queryKeys.searchAllData(keyword), () => search.searchAllData(keyword))
  }

  const searchCommunity = (
    keyword: string,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchQuestionResult>, any> => {
    // console.log(keyword)
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
    // console.log(keyword)
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

  return { searchTotal, searchAllData, searchCommunity, searchUser }
}

export default useSearchQuery
