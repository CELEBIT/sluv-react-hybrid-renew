import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { RecommendItemResult } from '../../item/itemService.type'
import { ClosetBoxModel } from '../../closet/model'

const useGetOtherUserClosetQuery = () => {
  const user = new UserService()

  const getOtherUserClosetList = (
    userId: number,
  ): UseInfiniteQueryResult<GetPaginationResult<ClosetBoxModel>, any> => {
    return useInfiniteQuery(
      queryKeys.getOtherUserClosetList(userId),
      ({ pageParam = 0 }) => user.getOtherUserClosetList(pageParam, userId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getOtherUserClosetList }
}

export default useGetOtherUserClosetQuery
