import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { communityItemState, firstItemState, secondItemState } from '../../recoil/communityInfo'
import { communityMenuState } from '../Header/CommunityHeader/CommunityHeader'
import { CommunityMenu } from '../../config/communityMenu'
import { useNavigate } from 'react-router-dom'
import {
  selectedCelebState,
  selectedGroupState,
  selectedNewCelebState,
} from '../SelectCeleb/SelectCeleb'

const CommunityTabChangeModal = ({ name, url }: CommunityMenu) => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  const setCommunityMenu = useSetRecoilState(communityMenuState)
  const setQuestionItem = useSetRecoilState(communityItemState)

  const setSelectedCeleb = useSetRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const setNewCeleb = useSetRecoilState(selectedNewCelebState)

  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)

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
      voteEndTime: undefined,
    })
    resetFirstItem()
    resetSecondItem()
    setCommunityMenu(name)
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    setSelectedGroup({ id: 0, celebNameKr: '' })
    setNewCeleb({ newCelebName: '' })
    closeModal(modals.CommunityTabChangeModal, () => {
      navigate(url)
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
