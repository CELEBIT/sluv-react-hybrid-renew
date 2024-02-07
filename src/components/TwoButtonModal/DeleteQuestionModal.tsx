import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useQuestionDetailQuery from '../../apis/question/hooks/useQuestionDetailQuery'
import { useRecoilValue } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'
import { useNavigate } from 'react-router-dom'

const DeleteQuestionModal = () => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  const EditReportItem = useRecoilValue(RequestEditItemState)

  const {
    deleteQuestion: { mutate: mutateByDeleteQuestion },
  } = useQuestionDetailQuery()

  const onDelete = () => {
    mutateByDeleteQuestion(EditReportItem.itemId)
    alert('삭제되었습니다')
    closeModal(modals.DeleteTempItemModal)
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={() => closeModal(modals.DeleteTempItemModal)}
      rightButtonOnClick={onDelete}
    >
      <BtnModalContent>
        해당 게시글을 삭제하실 건가요?
        <br />
        삭제된 글은 복구할 수 없어요
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default DeleteQuestionModal
