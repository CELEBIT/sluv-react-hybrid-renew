import { useQuery } from '@tanstack/react-query'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'

const useInterestCelebQuery = () => {
  const user = new UserService()
  const getInterestCeleb = useQuery(queryKeys.interestCeleb, () => user.getInterestCeleb())
  return { getInterestCeleb }
}

export default useInterestCelebQuery
