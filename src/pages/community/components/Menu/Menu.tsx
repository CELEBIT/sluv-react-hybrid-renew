import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as FindMenu } from '../../../../assets/Find_Menu.svg'
import { ReactComponent as BuyMenu } from '../../../../assets/Buy_Menu.svg'
import { ReactComponent as HowAboutMenu } from '../../../../assets/How_Menu.svg'
import { ReactComponent as RecommendMenu } from '../../../../assets/Recommend_Menu.svg'
import { Common, Pretendard } from '../../../../components/styles'

const Menu = () => {
  return (
    <MenuContainer>
      <EachMenu>
        <FindMenu></FindMenu>

        {<MenuText>찾아주세요</MenuText>}
      </EachMenu>
      <EachMenu>
        <BuyMenu></BuyMenu>
        <MenuText>이 중에 뭐 살까</MenuText>
      </EachMenu>
      <EachMenu>
        <HowAboutMenu></HowAboutMenu>
        <MenuText>이거 어때</MenuText>
      </EachMenu>
      <EachMenu>
        <RecommendMenu></RecommendMenu>
        <MenuText>추천해 줘</MenuText>
      </EachMenu>
    </MenuContainer>
  )
}

export default Menu

const MenuContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-evenly;
  gap: 0.6875rem;
  padding: 0.625rem 1.25rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 0 0 1.875rem 1.875rem;
  box-shadow: 0px 10px 10px 0px rgba(136, 137, 157, 0.15);
`
const EachMenu = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
const MenuText = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.BK })}
`
