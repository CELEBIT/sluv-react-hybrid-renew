import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useItemDetailQuery = (itemId: number) => {
  const item = new ItemService()
  const getItemDetail = () => {
    return useQuery(queryKeys.itemDetail, () => item.getItemDetail(itemId))
  }
  return { getItemDetail }
}

export default useItemDetailQuery
