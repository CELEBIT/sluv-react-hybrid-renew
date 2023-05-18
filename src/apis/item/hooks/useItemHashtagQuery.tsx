import ItemService from '../itemService'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'

const useItemHashtagQuery = () => {
  const item = new ItemService()
  const searchHashtag = (name: string) => {
    return useQuery(queryKeys.searchHashtag(name), () => item.searchHashtag(name))
  }
  return { searchHashtag }
}

export default useItemHashtagQuery
