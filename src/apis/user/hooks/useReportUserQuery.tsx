import { useMutation } from '@tanstack/react-query'
import UserService from '../userService'
import { EditRequestReason } from '../../../pages/item/editRequest'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

interface IReportUser {
  userId: number | undefined
  requestContent: EditRequestReason
}

const useReportUserQuery = () => {
  const user = new UserService()
  const { openModal } = useModals()

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

  return { reportUser }
}

export default useReportUserQuery
