import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'
import { EditRequestReason } from '../../../pages/item/editRequest'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { useNavigate } from 'react-router-dom'

interface IReportItem {
  itemId: number
  requestContent: EditRequestReason
}

const useItemDetailQuery = () => {
  const item = new ItemService()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { openModal } = useModals()

  const getItemDetail = (itemId: number) => {
    return useQuery(queryKeys.itemDetail(itemId), () => item.getItemDetail(itemId))
  }
  const getSameCelebItem = (itemId: number) => {
    return useQuery(queryKeys.sameCelebItem(itemId), () => item.getSameCelebItem(itemId))
  }
  const getSameBrandItem = (itemId: number) => {
    return useQuery(queryKeys.sameBrandItem(itemId), () => item.getSameBrandItem(itemId))
  }
  const getSameScrapItem = (itemId: number) => {
    return useQuery(queryKeys.sameScrapItem(itemId), () => item.getSameScrapItem(itemId))
  }

  const likeItem = useMutation((itemId: number) => item.likeItem(itemId), {
    onSuccess: (res, itemId) => {
      // queryClient.invalidateQueries(queryKeys.itemDetail(itemId))
      queryClient.invalidateQueries()
    },
  })
  const deleteItem = useMutation((itemId: number) => item.deleteItem(itemId), {
    onSuccess: (res) => {
      console.log(res)
      navigate(-1)
      queryClient.invalidateQueries()
    },
  })

  const requestEditItem = useMutation(
    ({ itemId, requestContent }: IReportItem) =>
      item.requsetEditItem(itemId, requestContent.reason, requestContent.content),
    {
      onSuccess: (res) => {
        openModal(modals.EditRequestCompleteModal)
      },
    },
  )

  const reportItem = useMutation(
    ({ itemId, requestContent }: IReportItem) =>
      item.reportItem(itemId, requestContent.reason, requestContent.content),
    {
      onSuccess: (res) => {
        if (res.code == 1000) {
          openModal(modals.EditRequestCompleteModal)
        }
      },
      onError: (error: any) => {
        if (error.response.data.code === 2011) {
          openModal(modals.DuplicateReportModal)
        }
      },
    },
  )

  return {
    getItemDetail,
    likeItem,
    deleteItem,
    reportItem,
    requestEditItem,
    getSameCelebItem,
    getSameBrandItem,
    getSameScrapItem,
  }
}

export default useItemDetailQuery
