import { toast } from 'react-toastify'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import TwoButtonModal from '.'
import useQuestionDetailQuery from '../../apis/question/hooks/useQuestionDetailQuery'
import { RequestEditItemState } from '../../pages/item/editRequest'
import { communityItemState } from '../../recoil/communityInfo'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'

const DeleteQuestionModal = () => {
  const { closeModal } = useModals()
  const EditReportItem = useRecoilValue(RequestEditItemState)
  const resetQuestionItem = useResetRecoilState(communityItemState)

  const {
    deleteQuestion: { mutate: mutateByDeleteQuestion },
  } = useQuestionDetailQuery()

  const onDelete = () => {
    closeModal(modals.DeleteQuestionModal, () => {
      mutateByDeleteQuestion(EditReportItem.itemId)
      resetQuestionItem()
      toast('삭제되었습니다')
    })
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={() => closeModal(modals.DeleteQuestionModal)}
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
