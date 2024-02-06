import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useTempItemQuery from '../../apis/item/hooks/useTempItemQuery'
import { useRecoilValue } from 'recoil'
import { checkListState } from '../../pages/item/temporary-storage'
import useItemDetailQuery from '../../apis/item/hooks/useItemDetailQuery'
import { useNavigate } from 'react-router-dom'

interface IProps {
  itemId: number
}

const DeleteItemModal = ({ itemId }: IProps) => {
  const { closeModal } = useModals()
  const navigate = useNavigate()

  const {
    deleteItem: { mutate: mutateItemDeleted },
  } = useItemDetailQuery()

  const onDelete = () => {
    mutateItemDeleted(itemId)
    closeModal(modals.DeleteItemModal)
    closeModal(modals.ItemEditModal)
    navigate(-1)
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={() => closeModal(modals.DeleteItemModal)}
      rightButtonOnClick={onDelete}
    >
      <BtnModalContent>
        게시글을 삭제하실건가요?
        <br />
        삭제된 글은 복구할 수 없어요
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default DeleteItemModal
