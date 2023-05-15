import { useMutation, useQueryClient } from '@tanstack/react-query'
import FollowService from '../followService'
import { queryKeys } from '../../../config/queryKeys'

interface IFollowUser {
  userId: number
}

const useFollowQuery = () => {
  const follow = new FollowService()
  const queryClient = useQueryClient()

  const followUser = useMutation(({ userId }: IFollowUser) => follow.followUser(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.itemDetail)
    },
  })

  return { followUser }
}

export default useFollowQuery
