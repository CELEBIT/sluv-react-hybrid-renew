import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'

import { atom, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
// import { atomKeys } from '../../config/atomKeys'
import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Share } from '../../assets/share_24.svg'
import { atomKeys } from '../../config/atomKeys'
import {
  communityItemState,
  communityQuestionMenuState,
  imgItemListState,
} from '../../recoil/communityInfo'
import { communityMenuState } from '../Header/CommunityHeader/CommunityHeader'
import { toast } from 'react-toastify'

export const questionTypeState = atom<string>({
  key: atomKeys.questionType,
  default: '',
})

const QuestionEditDeleteModal = () => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModals()
  const questionType = useRecoilValue(questionTypeState)
  const resetQuestionItem = useResetRecoilState(communityItemState)
  const resetImgItemList = useResetRecoilState(imgItemListState)
  const setCommunityQuestionMenu = useSetRecoilState(communityMenuState)

  const onClickEditQuestion = () => {
    closeModal(modals.QuestionEditDeleteModal, () => {
      if (questionType === 'Find') {
        navigate('/community/find-request/edit')
        setCommunityQuestionMenu('찾아주세요')
      }
      if (questionType === 'How') {
        navigate('/community/edit/howabout')
        setCommunityQuestionMenu('이거 어때')
      }
      if (questionType === 'Recommend') {
        navigate('/community/edit/recommend')
        setCommunityQuestionMenu('추천해 줘')
      }
      if (questionType === 'Buy') {
        resetQuestionItem()
        resetImgItemList()
        toast('투표가 시작되어 수정할 수 없어요')
      }
    })
  }
  const onClickDeleteQuestion = () => {
    closeModal(modals.QuestionEditDeleteModal, () => {
      openModal(modals.DeleteQuestionModal)
    })
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.QuestionReportModal)}
        />
        <MenuWrapper>
          <Menu onClick={onClickEditQuestion}>
            <Share stroke={Common.colors.BK}></Share>게시글 수정하기
          </Menu>
          <Menu onClick={onClickDeleteQuestion}>
            <Share stroke={Common.colors.BK}></Share>
            게시글 삭제하기
          </Menu>
        </MenuWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem 0.75rem 2rem;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 0.875rem 0;
  gap: 0.625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default QuestionEditDeleteModal
