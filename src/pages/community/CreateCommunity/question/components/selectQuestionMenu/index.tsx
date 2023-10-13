import React from 'react'
import { QuestionMenuList } from '../../../../../../config/communityMenu'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  communityItemState,
  communityQuestionMenuState,
  imgItemListState,
} from '../../../../../../recoil/communityInfo'
import ButtonMedium from '../../../../../../components/ButtonMedium/ButtonMedium'
import { MenuSelectWrapper } from './styles'
import useModals from '../../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../../components/Modals'
import { useLocation } from 'react-router-dom'
const SelectQuestionMenu = () => {
  const { pathname } = useLocation()
  const { openModal } = useModals()
  const [communityQuestionMenu, setCommunityQuestionMenu] = useRecoilState(
    communityQuestionMenuState,
  )
  const questionInfo = useRecoilValue(communityItemState)
  const [imgItemList] = useRecoilValue(imgItemListState)

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
      {pathname.includes('edit') ? (
        <>
          {QuestionMenuList.map((menu) => {
            if (menu === communityQuestionMenu)
              return (
                <ButtonMedium
                  key={menu}
                  type='pri'
                  text={menu}
                  active={menu === communityQuestionMenu}
                  onClick={() => onClickMenu(menu)}
                ></ButtonMedium>
              )
            else
              return (
                <ButtonMedium
                  key={menu}
                  type='disable'
                  text={menu}
                  active={menu === communityQuestionMenu}
                ></ButtonMedium>
              )
          })}
        </>
      ) : (
        <>
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
        </>
      )}
    </MenuSelectWrapper>
  )
}

export default SelectQuestionMenu
