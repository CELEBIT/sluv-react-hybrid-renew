import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useItemCategoryQuery = () => {
  const item = new ItemService()
  const getItemCategory = useQuery(queryKeys.itemCategory, () => item.getItemCategory())
  return { getItemCategory }
}

export default useItemCategoryQuery
