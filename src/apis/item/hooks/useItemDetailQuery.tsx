import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useItemDetailQuery = () => {
  const item = new ItemService()
  const getItemDetail = (itemId: number) => {
    return useQuery(queryKeys.itemDetail, () => item.getItemDetail(itemId))
  }
  return { getItemDetail }
}

export default useItemDetailQuery
