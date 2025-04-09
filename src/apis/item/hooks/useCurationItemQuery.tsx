import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

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
