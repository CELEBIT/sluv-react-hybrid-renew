import { useQuery } from '@tanstack/react-query'
import CelebService from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'

const useSelectCelebQuery = () => {
  const celeb = new CelebService()
  const getSelectCelebList = useQuery(queryKeys.getSelectCelebList, () =>
    celeb.getSelectCelebList(),
  )

  const searchSelectCeleb = (celebName: string) =>
    useQuery(queryKeys.searchSelectCeleb(celebName), () => celeb.searchSelectCeleb(celebName))

  return { getSelectCelebList, searchSelectCeleb }
}

export default useSelectCelebQuery
