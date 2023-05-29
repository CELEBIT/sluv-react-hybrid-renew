import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useTempItemQuery from '../../apis/item/hooks/useTempItemQuery'
import { useRecoilValue } from 'recoil'
import { checkListState } from '../../pages/item/temporary-storage'

interface IProps {
  type: string
}

const DeleteTempItemModal = ({ type }: IProps) => {
  const { closeModal } = useModals()
  const {
    deleteTempItem: { mutate: mutateItemDeleted },
    deleteTempItemAll: { mutate: mutateAllItemDeleted },
  } = useTempItemQuery()

  const checkedList = useRecoilValue(checkListState)

  const onDelete = () => {
    if (type === '전체삭제') {
      mutateAllItemDeleted()
    } else {
      mutateItemDeleted(checkedList)
    }
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName='삭제하기'
      leftButtonOnClick={() => closeModal(modals.DeleteTempItemModal)}
      rightButtonOnClick={onDelete}
    >
      <BtnModalContent>
        {type === '전체삭제' ? (
          <>
            전체 삭제하실 건가요?
            <br />
            삭제된 글은 복구할 수 없어요
          </>
        ) : (
          <>
            선택된 게시글을 삭제하실건가요?
            <br />
            삭제된 글은 복구할 수 없어요
          </>
        )}
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default DeleteTempItemModal
