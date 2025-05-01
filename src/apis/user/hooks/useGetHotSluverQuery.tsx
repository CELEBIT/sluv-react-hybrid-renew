import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { TCeleb } from '../../../pages/home/components/WeeklyTopUser/InterestCelebList/interestCelebList'
import UserService from '../userService'

const useGetHotSluverQuery = (CelebData?: TCeleb) => {
  const user = new UserService()
  const getHotSluver = useQuery(queryKeys.getHotSluver(CelebData), () =>
    user.getHotSluver(CelebData),
  )
  return { getHotSluver }
}

export default useGetHotSluverQuery
