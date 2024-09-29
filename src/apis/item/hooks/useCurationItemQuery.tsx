import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useCurationItemQuery = () => {
  const item = new ItemService()

  const getCurationItem = () => {
    return useQuery(queryKeys.curationItem, () => item.getCurationItem())
  }

  const getTrendItem = () => {
    return useQuery(queryKeys.trendItem, () => item.getTrendItem())
  }
  return { getCurationItem, getTrendItem }
}

export default useCurationItemQuery
