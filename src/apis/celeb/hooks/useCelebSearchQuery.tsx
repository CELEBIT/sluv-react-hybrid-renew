import { UseInfiniteQueryResult, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import CelebService, { ISearchCeleb } from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import useRecentCelebQuery from './useRecentCelebQuery'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  createItemCelebState,
  createItemNewCelebState,
  itemInfoState,
} from '../../../recoil/itemInfo'
import { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'

interface INewCeleb {
  newCelebName: string
}

const useCelebSearchQuery = () => {
  const celeb = new CelebService()

  const searchCeleb = (
    celebName: string,
  ): UseInfiniteQueryResult<GetPaginationResult<ISearchCeleb>, any> => {
    return useInfiniteQuery(
      queryKeys.searchCeleb(celebName),
      ({ pageParam = 0 }) => celeb.searchCeleb(celebName, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setCelebInfoInItem = useSetRecoilState(createItemCelebState)
  const setNewCeleb = useSetRecoilState(createItemNewCelebState)

  const postNewCeleb = useMutation(
    ({ newCelebName }: INewCeleb) => celeb.postNewCeleb(newCelebName),
    {
      onSuccess: (res) => {
        mutateByPostRecentCeleb({
          newCelebId: res?.newCelebId ?? null,
        })
        if (res?.newCelebId && res.newCelebName) {
          setNewCeleb({ id: res.newCelebId, newCelebName: res.newCelebName })
          setSelectedCeleb({
            id: res?.newCelebId,
            celebNameKr: res.newCelebName,
          })
          // setCelebInfoInItem({
          //   soloId: res?.newCelebId,
          //   soloName: res.newCelebName,
          // })
        }
      },
    },
  )
  return { searchCeleb, postNewCeleb }
}

export default useCelebSearchQuery
