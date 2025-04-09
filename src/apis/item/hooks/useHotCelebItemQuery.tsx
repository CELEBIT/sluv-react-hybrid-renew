import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useHotCelebItemQuery = () => {
  const item = new ItemService()

  const getHotCelebItem = (standard: string) => {
    return useQuery(queryKeys.hotCelebItem(standard), () => item.getHotCelebItem(standard))
  }
  return { getHotCelebItem }
}

export default useHotCelebItemQuery
