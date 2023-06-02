import React, { useEffect } from 'react'
import { QuestionMenuList } from '../../../../../config/communityMenu'
import { useRecoilState } from 'recoil'
import { communityQuestionMenuState } from '../../../../../recoil/communityInfo'
import ButtonMedium from '../../../../../components/ButtonMedium/ButtonMedium'
import { MenuSelectWrapper } from './styles'
const SelectQuestionMenu = () => {
  const [communityQuestionMenu, setCommunityQuestionMenu] = useRecoilState(
    communityQuestionMenuState,
  )
  return (
    <MenuSelectWrapper>
      {QuestionMenuList.map((menu) => {
        return (
          <ButtonMedium
            key={menu}
            type='pri'
            text={menu}
            active={menu === communityQuestionMenu}
            onClick={() => setCommunityQuestionMenu(menu)}
          ></ButtonMedium>
        )
      })}
    </MenuSelectWrapper>
  )
}

export default SelectQuestionMenu
