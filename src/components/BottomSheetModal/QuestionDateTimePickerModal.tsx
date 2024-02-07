import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import Header from '../Header/Header'
import { useRecoilState, useRecoilValue } from 'recoil'
import { communityItemState } from '../../recoil/communityInfo'
import SetVoteDateTime from '../../pages/community/CreateCommunity/question/components/setVoteTime'

const QuestionDateTimePickerModal = () => {
  const { closeModal } = useModals()

  const today = new Date()
  const questionInfo = useRecoilValue(communityItemState)

  const onComplete = () => {
    if (
      questionInfo.voteEndTime &&
      questionInfo?.voteEndTime < new Date(new Date().setHours(today.getHours() + 3))
    ) {
      console.log(new Date(new Date().setHours(today.getHours() + 3)))
      alert('마감시간은 지금으로부터 최소 3시간 이후로 설정할 수 있습니다')
    } else {
      closeModal(modals.QuestionDateTimePickerModal)
    }
  }

  const onCancel = () => {
    closeModal(modals.QuestionDateTimePickerModal)
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header title='투표 마감시간' isModalHeader={true} modalCloseBtnClick={onCancel} />
        <SetVoteDateTime />
        <ButtonWrapper>
          <ButtonLarge text='완료' active={true} onClick={onComplete}></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default QuestionDateTimePickerModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 1.25rem;
`
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 0;
`
