import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  imgListState,
  secondItemState,
} from '../../recoil/communityInfo'

export interface QuestionChangeModalProps {
  changeTo: string
}

const QuestionChangeModal = ({ changeTo }: QuestionChangeModalProps) => {
  const { closeModal } = useModals()
  const setQuestionMenu = useSetRecoilState(communityQuestionMenuState)
  const setQuestionItem = useSetRecoilState(communityItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)
  const resetImageItemList = useResetRecoilState(imgListState)

  const changeMenu = () => {
    setQuestionItem({
      id: null,
      celebId: null,
      newCelebId: null,
      title: null,
      content: null,
      imgList: null,
      itemList: null,
      categoryNameList: null,
    })
    resetFirstItem()
    resetSecondItem()
    resetImageItemList()
    setQuestionMenu(changeTo)
    closeModal(modals.QuestionChangeModal)
  }

  return (
    <TwoButtonModal
      leftButtonName='변경 하기'
      rightButtonName='이어 쓰기'
      leftButtonOnClick={() => changeMenu()}
      rightButtonOnClick={() => closeModal(modals.QuestionChangeModal)}
    >
      <BtnModalContent>
        &ldquo;{changeTo}&rdquo;로 변경하실 건가요? <br />
        현재 작성글은 복구할 수 없어요
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default QuestionChangeModal
