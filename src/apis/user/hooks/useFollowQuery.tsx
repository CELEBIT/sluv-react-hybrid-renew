import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import UserService, { IUserResult } from '../userService'

interface IFollow {
  userId: number
  itemId?: number
}

const useFollowQuery = () => {
  const user = new UserService()
  const queryClient = useQueryClient()

  const followUser = useMutation(({ userId }: IFollow) => user.followUser(userId), {
    onSuccess: (res, vars) => {
      if (vars.itemId) queryClient.invalidateQueries(queryKeys.itemDetail(vars.itemId))
      else {
        queryClient.invalidateQueries()
      }
    },
  })

  const getUserFollowerList = (): UseInfiniteQueryResult<GetPaginationResult<IUserResult>, any> => {
    return useInfiniteQuery(
      queryKeys.userFollowerList,
      ({ pageParam = 0 }) => user.getFollowerList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getUserFollowingList = (): UseInfiniteQueryResult<
    GetPaginationResult<IUserResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.userFollowingList,
      ({ pageParam = 0 }) => user.getFollowingList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getOtherUserFollowerList = (
    userId: number,
  ): UseInfiniteQueryResult<GetPaginationResult<IUserResult>, any> => {
    return useInfiniteQuery(
      queryKeys.otherUserFollowerList(userId),
      ({ pageParam = 0 }) => user.getUserFollowerList(userId, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getOtherUserFollowingList = (
    userId: number,
  ): UseInfiniteQueryResult<GetPaginationResult<IUserResult>, any> => {
    return useInfiniteQuery(
      queryKeys.otherUserFollowingList(userId),
      ({ pageParam = 0 }) => user.getUserFollowingList(userId, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  return {
    followUser,
    getUserFollowerList,
    getUserFollowingList,
    getOtherUserFollowerList,
    getOtherUserFollowingList,
  }
}

export default useFollowQuery
