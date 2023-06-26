import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../itemService.type'

const useHowAboutItemQuery = () => {
  const item = new ItemService()

  const getHowAboutItem = () => {
    return useQuery(queryKeys.howAboutItem, () => item.getHowAboutItem())
  }
  return { getHowAboutItem }
}

export default useHowAboutItemQuery
