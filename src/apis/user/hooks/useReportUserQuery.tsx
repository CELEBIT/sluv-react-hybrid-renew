import { useMutation, useQueryClient } from '@tanstack/react-query'
import { modals } from '../../../components/Modals'
import useModals from '../../../components/Modals/hooks/useModals'
import { EditRequestReason } from '../../../pages/item/editRequest'
import UserService from '../userService'

interface IReportUser {
  userId: number | undefined
  requestContent: EditRequestReason
}

const useReportUserQuery = () => {
  const user = new UserService()
  const { openModal, closeModal } = useModals()
  const queryClient = useQueryClient()

  const reportUser = useMutation(
    ({ userId, requestContent }: IReportUser) =>
      user.reportUser(userId, requestContent.reason, requestContent.content),
    {
      onSuccess: (res) => {
        if (res.code == 1000) {
          openModal(modals.UserReportCompleteModal)
        }
      },
      onError: (error: any) => {
        if (error.response.data.code === 2010) {
          openModal(modals.DuplicateReportModal)
        }
      },
    },
  )

  const blockUser = useMutation((userId: number) => user.blockUser(userId), {
    onSuccess: (res) => {
      console.log('res', res)
      if (res.code == 1000) {
        closeModal(modals.BlockUserModal)
        queryClient.invalidateQueries()
      }
    },
  })

  return { reportUser, blockUser }
}

export default useReportUserQuery
