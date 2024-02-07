import { useQuery } from '@tanstack/react-query'
import CelebService from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'

const useHotCelebQuery = () => {
  const celeb = new CelebService()
  const getHotCeleb = useQuery(queryKeys.hotCeleb, () => celeb.getHotCeleb())
  return { getHotCeleb }
}

export default useHotCelebQuery
