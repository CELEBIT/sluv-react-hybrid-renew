import { useQuery } from '@tanstack/react-query'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'

const useGetHotSluverQuery = (celebId?: number) => {
  const user = new UserService()
  const getHotSluver = useQuery(queryKeys.getHotSluver(celebId), () => user.getHotSluver(celebId))
  return { getHotSluver }
}

export default useGetHotSluverQuery
