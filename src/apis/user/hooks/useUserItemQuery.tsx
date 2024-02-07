import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { RecommendItemResult } from '../../item/itemService.type'

const useUserItemQuery = () => {
  const user = new UserService()

  // 현재 유저의 아이템(본인)
  const getUserUploadItem = (): UseInfiniteQueryResult<
    GetPaginationResult<RecommendItemResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.userUploadItem,
      ({ pageParam = 0 }) => user.getUserUploadItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  // 다른 유저의 아이템(타인)
  const getOtherUserUploadItem = (
    userId: number,
  ): UseInfiniteQueryResult<GetPaginationResult<RecommendItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.otherUserUploadItem(userId),
      ({ pageParam = 0 }) => user.getOtherUserUploadItem(pageParam, userId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getUserUploadItem, getOtherUserUploadItem }
}

export default useUserItemQuery
