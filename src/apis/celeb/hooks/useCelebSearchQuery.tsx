import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import CelebService, { ISearchCeleb } from '../CelebService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'

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
  return { searchCeleb }
}

export default useCelebSearchQuery
