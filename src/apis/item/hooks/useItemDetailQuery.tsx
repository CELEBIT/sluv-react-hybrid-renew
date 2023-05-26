import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { EditRequestReason } from '../../../pages/item/editRequest'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

interface IReportItem {
  itemId: number
  requestContent: EditRequestReason
}

const useItemDetailQuery = () => {
  const item = new ItemService()
  const queryClient = useQueryClient()
  const { openModal } = useModals()

  const getItemDetail = (itemId: number) => {
    return useQuery(queryKeys.itemDetail(itemId), () => item.getItemDetail(itemId))
  }

  const likeItem = useMutation((itemId: number) => item.likeItem(itemId), {
    onSuccess: (res, itemId) => {
      console.log(res)
      queryClient.invalidateQueries(queryKeys.itemDetail(itemId))
    },
  })

  const requestEditItem = useMutation(
    ({ itemId, requestContent }: IReportItem) => item.requsetEditItem(itemId, requestContent),
    {
      onSuccess: (res) => {
        console.log(res)
        openModal(modals.EditRequestCompleteModal)
      },
    },
  )

  const reportItem = useMutation(
    ({ itemId, requestContent }: IReportItem) => item.reportItem(itemId, requestContent),
    {
      onSuccess: (res) => {
        console.log(res)
        openModal(modals.EditRequestCompleteModal)
      },
    },
  )

  return { getItemDetail, likeItem, reportItem, requestEditItem }
}

export default useItemDetailQuery
