import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useHowAboutItemQuery = () => {
  const item = new ItemService()

  const getHowAboutItem = () => {
    return useQuery(queryKeys.howAboutItem, () => item.getHowAboutItem())
  }
  return { getHowAboutItem }
}

export default useHowAboutItemQuery
