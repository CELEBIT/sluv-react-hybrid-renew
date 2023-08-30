import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import UserService, { IUserResult } from '../userService'
import { GetPaginationResult } from '../../core/type'

interface IFollow {
  userId: number
  itemId?: number
}

const useFollowQuery = () => {
  const user = new UserService()
  const queryClient = useQueryClient()

  const followUser = useMutation(({ userId, itemId }: IFollow) => user.followUser(userId), {
    onSuccess: (res, vars) => {
      console.log(res, vars)
      if (vars.itemId) queryClient.invalidateQueries(queryKeys.itemDetail(vars.itemId))
      else {
        queryClient.invalidateQueries(queryKeys.userFollowerList)
        queryClient.invalidateQueries(queryKeys.userFollowingList)
        queryClient.invalidateQueries(queryKeys.getMypageInfo)
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

  return { followUser, getUserFollowerList, getUserFollowingList }
}

export default useFollowQuery
