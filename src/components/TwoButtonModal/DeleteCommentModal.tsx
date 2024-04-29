import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useItemDetailQuery from '../../apis/item/hooks/useItemDetailQuery'
import { useNavigate } from 'react-router-dom'
import useSearchCommentQuery from '../../apis/comment/hooks/useSearchCommentQuery'
import { useResetRecoilState } from 'recoil'
import { commentState } from '../../pages/community/detail/CommunityDetail'

interface DeleteCommentModalProps {
  commentId: number
  questionId: number
}

const DeleteCommentModal = ({ commentId, questionId }: DeleteCommentModalProps) => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  const resetCommentObject = useResetRecoilState(commentState)
  const {
    deleteComment: { mutate: mutateCommentDeleted },
  } = useSearchCommentQuery()

  const onDelete = () => {
    mutateCommentDeleted({ commentId, questionId })
    closeModal(modals.DeleteCommentModal)
    resetCommentObject()
    navigate(-1)
  }

  const onClose = () => {
    resetCommentObject()
    closeModal(modals.DeleteCommentModal)
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
