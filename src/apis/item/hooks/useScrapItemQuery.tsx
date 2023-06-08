import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ScrapItemResult } from '../itemService.type'

const useScrapItemQuery = () => {
  const item = new ItemService()

  const getScrapItem = (): UseInfiniteQueryResult<GetPaginationResult<ScrapItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.scrapItem,
      ({ pageParam = 0 }) => item.getScrapItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getScrapItem }
}

export default useScrapItemQuery
