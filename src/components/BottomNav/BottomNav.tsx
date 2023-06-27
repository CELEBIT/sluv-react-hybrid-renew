import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from '../Icon/Icon'
import { BottomNavItemData } from './BottomNav.type'
import { BOTTOM_NAV_ITEM_DATA, BOTTOM_NAV_PATH_INFO } from './BottomNav.util'
import { BottomNavItemLink, BottomNavLabel, Root } from './styles'
import { ReactComponent as Home } from './../../assets/home_gray_24.svg'
import { ReactComponent as Community } from './../../assets/community_gray_24.svg'
import { ReactComponent as Upload } from './../../assets/upload_gray_24.svg'

const BottomNav = () => {
  const { pathname } = useLocation()

  const isOpen = useMemo(() => {
    return BOTTOM_NAV_PATH_INFO[pathname]
  }, [pathname])

  return (
    <Root isOpen={isOpen}>
      <BottomNavItemLink key={BOTTOM_NAV_ITEM_DATA[0].path} to={BOTTOM_NAV_ITEM_DATA[0].path}>
        <Home />
        <BottomNavLabel>{BOTTOM_NAV_ITEM_DATA[0].label}</BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink key={BOTTOM_NAV_ITEM_DATA[1].path} to={BOTTOM_NAV_ITEM_DATA[1].path}>
        <Community />
        <BottomNavLabel>{BOTTOM_NAV_ITEM_DATA[1].label}</BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink key={BOTTOM_NAV_ITEM_DATA[2].path} to={BOTTOM_NAV_ITEM_DATA[2].path}>
        <Upload />
        <BottomNavLabel>{BOTTOM_NAV_ITEM_DATA[2].label}</BottomNavLabel>
      </BottomNavItemLink>
    </Root>
  )
}

export default BottomNav
