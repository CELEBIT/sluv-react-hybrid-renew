import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CelebService, { CelebFlag } from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'

interface IPostRecentCeleb {
  celebId: number | null
  newCelebId: number | null
}
interface IDeleteRecentCeleb {
  celebId: number
  flag: CelebFlag
}

const useRecentCelebQuery = () => {
  const celeb = new CelebService()
  const queryClient = useQueryClient()
  const getRecentCeleb = useQuery(queryKeys.recentCeleb, () => celeb.getRecentCeleb())
  const postRecentCeleb = useMutation(({ celebId, newCelebId }: IPostRecentCeleb) =>
    celeb.postRecentCeleb(celebId, newCelebId),
  )
  const deleteRecentCeleb = useMutation(
    ({ celebId, flag }: IDeleteRecentCeleb) => celeb.deleteRecentCeleb(celebId, flag),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.recentCeleb)
      },
    },
  )
  const deleteAllRecentCeleb = useMutation(() => celeb.deleteAllRecentCeleb(), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recentCeleb)
    },
  })
  return { getRecentCeleb, postRecentCeleb, deleteRecentCeleb, deleteAllRecentCeleb }
}

export default useRecentCelebQuery
