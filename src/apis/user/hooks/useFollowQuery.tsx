import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import UserService from '../userService'

const useFollowQuery = () => {
  const user = new UserService()
  const queryClient = useQueryClient()

  const followUser = useMutation((userId: number) => user.followUser(userId), {
    onSuccess: (res, itemId) => {
      console.log(res)
      queryClient.invalidateQueries(queryKeys.itemDetail(itemId))
    },
  })

  return { followUser }
}

export default useFollowQuery
