import { useQuery } from '@tanstack/react-query'
import CelebService from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'

const useSelectCelebQuery = () => {
  const celeb = new CelebService()
  const getSelectCelebList = useQuery(queryKeys.getSelectCelebList, () =>
    celeb.getSelectCelebList(),
  )
  return { getSelectCelebList }
}

export default useSelectCelebQuery
