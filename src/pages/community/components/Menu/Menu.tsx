import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as FindMenu } from '../../../../assets/Find_Menu.svg'
import { ReactComponent as BuyMenu } from '../../../../assets/Buy_Menu.svg'
import { ReactComponent as HowAboutMenu } from '../../../../assets/How_Menu.svg'
import { ReactComponent as RecommendMenu } from '../../../../assets/Recommend_Menu.svg'
import { ReactComponent as FindMenuSmall } from '../../../../assets/Find_Menu_Small.svg'
import { ReactComponent as BuyMenuSmall } from '../../../../assets/Buy_Menu_Small.svg'
import { ReactComponent as HowAboutMenuSmall } from '../../../../assets/How_Menu_Small.svg'
import { ReactComponent as RecommendMenuSmall } from '../../../../assets/Recommend_Menu_Small.svg'
import { Common, Pretendard } from '../../../../components/styles'

interface MenuProps {
  menuRef: React.RefObject<HTMLDivElement>
  isStickyAtTop: boolean
}

const Menu = ({ isStickyAtTop, menuRef }: MenuProps) => {
  return (
    <MenuContainer ref={menuRef}>
      <EachMenu>
        {isStickyAtTop ? <FindMenuSmall></FindMenuSmall> : <FindMenu></FindMenu>}
        {!isStickyAtTop && <MenuText>찾아주세요</MenuText>}
      </EachMenu>
      <EachMenu>
        {isStickyAtTop ? <BuyMenuSmall></BuyMenuSmall> : <BuyMenu></BuyMenu>}
        {!isStickyAtTop && <MenuText>이 중에 뭐 살까</MenuText>}
      </EachMenu>
      <EachMenu>
        {isStickyAtTop ? <HowAboutMenuSmall></HowAboutMenuSmall> : <HowAboutMenu></HowAboutMenu>}
        {!isStickyAtTop && <MenuText>이거 어때</MenuText>}
      </EachMenu>
      <EachMenu>
        {isStickyAtTop ? (
          <RecommendMenuSmall></RecommendMenuSmall>
        ) : (
          <RecommendMenu></RecommendMenu>
        )}
        {!isStickyAtTop && <MenuText>추천해 줘</MenuText>}
      </EachMenu>
    </MenuContainer>
  )
}

export default Menu

export const MenuContainer = styled.div`
  display: flex;
  position: sticky;
  top: -0.0625rem;
  justify-content: space-evenly;
  gap: 0.6875rem;
  padding: 0.625rem 1.25rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 0 0 1.875rem 1.875rem;
  box-shadow: 0px 10px 10px 0px rgba(136, 137, 157, 0.15);
`
export const EachMenu = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`
export const MenuText = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.BK })}
`
