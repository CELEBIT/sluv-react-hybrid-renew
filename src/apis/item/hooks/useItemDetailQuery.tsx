import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useItemDetailQuery = () => {
  const item = new ItemService()
  const queryClient = useQueryClient()

  const getItemDetail = (itemId: number) => {
    return useQuery(queryKeys.itemDetail(itemId), () => item.getItemDetail(itemId))
  }

  const likeItem = useMutation((itemId: number) => item.likeItem(itemId), {
    onSuccess: (res, itemId) => {
      console.log(res)
      queryClient.invalidateQueries(queryKeys.itemDetail(itemId))
    },
  })

  return { getItemDetail, likeItem }
}

export default useItemDetailQuery
