import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import UserService from '../userService'

interface IFollow {
  userId: number
  itemId: number
}

const useFollowQuery = () => {
  const user = new UserService()
  const queryClient = useQueryClient()

  const followUser = useMutation(({ userId, itemId }: IFollow) => user.followUser(userId), {
    onSuccess: (res, vars) => {
      console.log(res, vars)
      queryClient.invalidateQueries(queryKeys.itemDetail(vars.itemId))
    },
  })

  return { followUser }
}

export default useFollowQuery
