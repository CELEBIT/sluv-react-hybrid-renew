import React, { memo, useState } from 'react'
import { Title } from '../styles'
import { ReactComponent as ArrowBack } from '../../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../../assets/close_20.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow_up_18.svg'
import { ReactComponent as ArrowDown } from '../../../assets/arrow_down_18.svg'
import { ReactComponent as Add } from '../../../assets/add_18.svg'
import { useNavigate } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'
import { HeaderWrapper } from './styles'
import DropDownMenu from './DropDownMenu'
import { Menu } from './DropDownMenu/styles'
import { CommunityMenu, CommunityMenuList } from '../../../config/communityMenu'

interface HeaderProps {
  children?: any
  backBtnClick?: () => void
}

export const communityMenuState = atom<string>({
  key: atomKeys.communityMenuState,
  default: '찾아주세요',
})

const CommunityHeader = ({ children, backBtnClick }: HeaderProps) => {
  const navigate = useNavigate()
  const [communityMenu, setCommunityMenu] = useRecoilState(communityMenuState)
  const [menuOpen, setMenuOpen] = useState(false)
  const onMenuClick = (menu: CommunityMenu) => {
    setCommunityMenu(menu.name)
    navigate(menu.url)
  }
  return (
    <HeaderWrapper role='heading'>
      <div className='left' onClick={() => setMenuOpen(!menuOpen)}>
        <ArrowBack onClick={backBtnClick} className='arrow-back' />
        <Title>{communityMenu}</Title>
        {menuOpen ? <ArrowUp /> : <ArrowDown />}

        {menuOpen === true && (
          <DropDownMenu>
            {CommunityMenuList.map((menu) => {
              return (
                <Menu key={menu.name} onClick={() => onMenuClick(menu)}>
                  <Add></Add>
                  <span>{menu.name}</span>
                </Menu>
              )
            })}
          </DropDownMenu>
        )}
      </div>
      <div className='right'>{children}</div>
    </HeaderWrapper>
  )
}

export default memo(CommunityHeader)
