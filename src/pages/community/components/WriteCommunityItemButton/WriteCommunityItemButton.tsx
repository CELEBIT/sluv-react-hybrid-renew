import React, { useState } from 'react'
import { CommunityMenuList } from '../../../../config/communityMenu'
import DropDownMenu from '../../../../components/Header/CommunityHeader/DropDownMenu'
import { Menu } from '../../../../components/Header/CommunityHeader/DropDownMenu/styles'
import { ReactComponent as Add } from '../../../../assets/add_18.svg'
import { ReactComponent as Write } from '../../../../assets/writeCommunity_40.svg'
import { ReactComponent as Close } from '../../../../assets/closeCommunity_40.svg'
import { useNavigate } from 'react-router-dom'
import { WriteCommunityItemButtonWrapper } from './styles'

const WriteCommunityItemButton = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <WriteCommunityItemButtonWrapper>
      {menuOpen === true ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <DropDownMenu top={-110}>
            {CommunityMenuList.map((menu) => {
              return (
                <Menu key={menu.name} onClick={() => navigate(menu.url)}>
                  <Add></Add>
                  <span>{menu.name}</span>
                </Menu>
              )
            })}
          </DropDownMenu>
          <Close onClick={() => setMenuOpen(!menuOpen)}></Close>
        </div>
      ) : (
        <Write onClick={() => setMenuOpen(!menuOpen)}></Write>
      )}
    </WriteCommunityItemButtonWrapper>
  )
}

export default WriteCommunityItemButton
