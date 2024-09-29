import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  communityItemState,
  firstItemState,
  imgItemListState,
  secondItemState,
} from '../../recoil/communityInfo'
import { communityMenuState } from '../Header/CommunityHeader/CommunityHeader'
import { CommunityMenu } from '../../config/communityMenu'
import { useNavigate } from 'react-router-dom'
import { selectedCelebState, selectedGroupState } from '../SelectCeleb/SelectCeleb'
import { createItemCelebState, createItemNewCelebState } from '../../recoil/itemInfo'

const CommunityTabChangeModal = ({ name, url }: CommunityMenu) => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  const setCommunityMenu = useSetRecoilState(communityMenuState)
  const resetCelebInfoInItemState = useResetRecoilState(createItemCelebState)
  const resetQuestionItem = useResetRecoilState(communityItemState)

  const resetSelectedCeleb = useResetRecoilState(selectedCelebState)
  const resetSelectedGroup = useResetRecoilState(selectedGroupState)
  const resetNewCeleb = useResetRecoilState(createItemNewCelebState)

  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)
  const resetImageItemList = useResetRecoilState(imgItemListState)

  const changeMenu = () => {
    closeModal(modals.CommunityTabChangeModal, () => {
      resetQuestionItem()
      resetCelebInfoInItemState()
      resetFirstItem()
      resetSecondItem()
      resetImageItemList()
      setCommunityMenu(name)
      resetSelectedCeleb()
      resetSelectedGroup()
      resetNewCeleb()
      navigate(url, { replace: true })
    })
  }

  return (
    <TwoButtonModal
      leftButtonName='변경 하기'
      rightButtonName='이어 쓰기'
      leftButtonOnClick={() => changeMenu()}
      rightButtonOnClick={() => closeModal(modals.CommunityTabChangeModal)}
    >
      <BtnModalContent>
        &ldquo;{name}&rdquo;로 변경하실 건가요? <br />
        현재 작성글은 복구할 수 없어요
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default CommunityTabChangeModal
