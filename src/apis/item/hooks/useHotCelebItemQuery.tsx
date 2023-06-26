import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useHotCelebItemQuery = () => {
  const item = new ItemService()

  const getHotCelebItem = (standard: string) => {
    return useQuery(queryKeys.hotCelebItem(standard), () => item.getHotCelebItem(standard))
  }
  return { getHotCelebItem }
}

export default useHotCelebItemQuery
