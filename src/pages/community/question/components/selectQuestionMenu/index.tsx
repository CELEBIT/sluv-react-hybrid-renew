import React from 'react'
import { QuestionMenuList } from '../../../../../config/communityMenu'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  communityItemState,
  communityQuestionMenuState,
  imgListState,
} from '../../../../../recoil/communityInfo'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import { MenuSelectWrapper } from './styles'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
const SelectQuestionMenu = () => {
  const { openModal } = useModals()
  const [communityQuestionMenu, setCommunityQuestionMenu] = useRecoilState(
    communityQuestionMenuState,
  )
  const questionInfo = useRecoilValue(communityItemState)
  const [imgItemList] = useRecoilValue(imgListState)

  const onClickMenu = (menu: string) => {
    if (
      menu !== communityQuestionMenu &&
      (questionInfo.id ||
        questionInfo.celebId ||
        questionInfo.newCelebId ||
        questionInfo.title ||
        questionInfo.content ||
        // questionInfo.imgList ||
        // questionInfo.itemList ||
        questionInfo.categoryNameList ||
        imgItemList)
    )
      openModal(modals.QuestionChangeModal, { changeTo: menu })
    else {
      setCommunityQuestionMenu(menu)
    }
  }
  return (
    <MenuSelectWrapper>
      {QuestionMenuList.map((menu) => {
        return (
          <ButtonMedium
            key={menu}
            type='pri'
            text={menu}
            active={menu === communityQuestionMenu}
            onClick={() => onClickMenu(menu)}
          ></ButtonMedium>
        )
      })}
    </MenuSelectWrapper>
  )
}

export default SelectQuestionMenu
