import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'

const useItemCategoryQuery = () => {
  const item = new ItemService()
  const getItemCategory = useQuery(['itemCategory'], () => item.getItemCategory(), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  })
  return { getItemCategory }
}

export default useItemCategoryQuery
