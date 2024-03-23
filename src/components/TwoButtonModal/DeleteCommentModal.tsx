import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useItemDetailQuery from '../../apis/item/hooks/useItemDetailQuery'
import { useNavigate } from 'react-router-dom'
import useSearchCommentQuery from '../../apis/comment/hooks/useSearchCommentQuery'

interface IProps {
  commentId: number
  questionId: number
}

const DeleteCommentModal = ({ commentId, questionId }: IProps) => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  console.log('commentId', commentId)
  console.log('questionId', questionId)

  const {
    deleteComment: { mutate: mutateCommentDeleted },
  } = useSearchCommentQuery()

  const onDelete = () => {
    mutateCommentDeleted({ commentId, questionId })
    closeModal(modals.DeleteCommentModal)
    navigate(-1)
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={() => closeModal(modals.DeleteCommentModal)}
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
