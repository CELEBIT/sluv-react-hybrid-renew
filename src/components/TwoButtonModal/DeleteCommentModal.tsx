import { useResetRecoilState } from 'recoil'
import TwoButtonModal from '.'
import useSearchCommentQuery from '../../apis/comment/hooks/useSearchCommentQuery'
import { commentState } from '../../pages/community/detail/CommunityDetail'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'

export interface DeleteCommentModalProps {
  commentId: number
  questionId: number
}

const DeleteCommentModal = ({ commentId, questionId }: DeleteCommentModalProps) => {
  const { closeModal } = useModals()
  const resetCommentObject = useResetRecoilState(commentState)
  const {
    deleteComment: { mutate: mutateCommentDeleted },
  } = useSearchCommentQuery()

  const onDelete = () => {
    closeModal(modals.DeleteCommentModal, () => {
      mutateCommentDeleted({ commentId, questionId })
      resetCommentObject()
    })
  }

  const onClose = () => {
    closeModal(modals.DeleteCommentModal, () => {
      resetCommentObject()
    })
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={onClose}
      rightButtonOnClick={onDelete}
    >
      <BtnModalContent>
        해당 댓글을 삭제하실건가요?
        <br />
        삭제된 글은 복구할 수 없어요
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default DeleteCommentModal
