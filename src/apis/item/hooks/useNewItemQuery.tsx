import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useNewItemQuery = () => {
  const item = new ItemService()

  const getNewItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(queryKeys.newItem, ({ pageParam = 0 }) => item.getNewItem(pageParam), {
      getNextPageParam: (lastPage) => {
        if (lastPage?.hasNext) return lastPage.page + 1
        return undefined
      },
    })
  }
  return { getNewItem }
}

export default useNewItemQuery
