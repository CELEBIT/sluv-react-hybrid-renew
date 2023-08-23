import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { RecommendItemResult } from '../../item/itemService.type'

const useUserClosetQuery = () => {
  const user = new UserService()

  // 현재 유저의 아이템(본인)
  const getUserClosetList = useQuery(queryKeys.userClosetList, () => user.getUserClosetList())

  // const getUserClosetList = (): UseInfiniteQueryResult<
  //   GetPaginationResult<RecommendItemResult>,
  //   any
  // > => {
  //   return useInfiniteQuery(
  //     queryKeys.userClosetList,
  //     ({ pageParam = 0 }) => user.getUserClosetList(pageParam),
  //     {
  //       getNextPageParam: (lastPage) => {
  //         if (lastPage?.hasNext) return lastPage.page + 1
  //         return undefined
  //       },
  //     },
  //   )
  // }

  // 다른 유저의 아이템(타인)
  const getOtherUserClosetList = (
    userId: number,
  ): UseInfiniteQueryResult<GetPaginationResult<RecommendItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.otherUserClosetList(userId),
      ({ pageParam = 0 }) => user.getOtherUserClosetList(pageParam, userId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getUserClosetList, getOtherUserClosetList }
}

export default useUserClosetQuery
