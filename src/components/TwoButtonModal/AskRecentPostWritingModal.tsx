import React from 'react'
import TwoButtonModal from '.';
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals';
import { BtnModalContent } from '../Modals/styles';

const AskRecentPostWritingModal = () => {
  const { closeModal } = useModals();

  return (
    <TwoButtonModal
      leftButtonName='새로 쓰기'
      rightButtonName='이어 쓰기'
      leftButtonOnClick={() => closeModal(modals.AskRecentPostWritingModal)}
      rightButtonOnClick={() => console.log('이어 쓰기')}
    >
      <BtnModalContent>
        최근에 작성하던 글이 있어요! <br />
        이어서 쓰실 건가요?
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default AskRecentPostWritingModal;