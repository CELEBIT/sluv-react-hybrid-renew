import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'

interface IProps {
  type: string
}

const DeleteTempItemModal = ({ type }: IProps) => {
  const { closeModal } = useModals()

  const onDelete = () => {
    console.log('삭제')
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
