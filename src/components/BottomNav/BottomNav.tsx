import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from '../Icon/Icon'
import { BottomNavItemData } from './BottomNav.type'
import { BOTTOM_NAV_ITEM_DATA, BOTTOM_NAV_PATH_INFO } from './BottomNav.util'
import { BottomNavItemLink, BottomNavLabel, Root } from './styles'
import { ReactComponent as Home } from './../../assets/home_gray_24.svg'
import { ReactComponent as Community } from './../../assets/community_gray_24.svg'
import { ReactComponent as Upload } from './../../assets/upload_gray_24.svg'
import { ReactComponent as Closet } from './../../assets/closet_gray_24.svg'
import { ReactComponent as Mypage } from './../../assets/user_gray_24.svg'

import { ReactComponent as HomeActive } from './../../assets/home_active_24.svg'
import { ReactComponent as CommunityActive } from './../../assets/community_active_24.svg'
import { ReactComponent as UploadActive } from './../../assets/upload_active_24.svg'
import { ReactComponent as ClosetActive } from './../../assets/closet_active_24.svg'
import { ReactComponent as MypageActive } from './../../assets/user_active_24.svg'
import storage from '../../utils/storage'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'

const BottomNav = () => {
  const { pathname } = useLocation()
  const { openModal } = useModals()
  const isOpen = useMemo(() => {
    return BOTTOM_NAV_PATH_INFO[pathname]
  }, [pathname])

  const [isPreview, setIsPreview] = useState<boolean>(false)

  useEffect(() => {
    if (!storage.get('accessToken')) {
      setIsPreview(true)
    }
  })
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // isPreview가 true일 경우, 페이지 이동을 막고 모달을 엽니다.
    if (isPreview) {
      event.preventDefault()
      openModal(modals.LoginToContinueModal)
    }
    // 그 외의 경우는 Link 컴포넌트가 정상적으로 동작하여 페이지를 이동합니다.
  }

  return (
    <Root isOpen={isOpen}>
      <BottomNavItemLink key={BOTTOM_NAV_ITEM_DATA[0].path} to={BOTTOM_NAV_ITEM_DATA[0].path}>
        {pathname === '/home' ? <HomeActive /> : <Home />}
        <BottomNavLabel className={pathname === '/home' ? 'active' : ''}>
          {BOTTOM_NAV_ITEM_DATA[0].label}
        </BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink
        key={BOTTOM_NAV_ITEM_DATA[1].path}
        to={BOTTOM_NAV_ITEM_DATA[1].path}
        onClick={handleLinkClick}
      >
        {pathname.includes('/community') ? <CommunityActive /> : <Community />}
        <BottomNavLabel className={pathname.includes('/community') ? 'active' : ''}>
          {BOTTOM_NAV_ITEM_DATA[1].label}
        </BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink
        key={BOTTOM_NAV_ITEM_DATA[2].path}
        to={BOTTOM_NAV_ITEM_DATA[2].path}
        onClick={handleLinkClick}
      >
        {pathname === '/item/create' ? <UploadActive /> : <Upload />}
        <BottomNavLabel className={pathname === '/item/create' ? 'active' : ''}>
          {BOTTOM_NAV_ITEM_DATA[2].label}
        </BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink
        key={BOTTOM_NAV_ITEM_DATA[3].path}
        to={BOTTOM_NAV_ITEM_DATA[3].path}
        onClick={handleLinkClick}
      >
        {pathname === '/closet' ? <ClosetActive /> : <Closet />}
        <BottomNavLabel className={pathname === '/closet' ? 'active' : ''}>
          {BOTTOM_NAV_ITEM_DATA[3].label}
        </BottomNavLabel>
      </BottomNavItemLink>
      <BottomNavItemLink
        key={BOTTOM_NAV_ITEM_DATA[4].path}
        to={BOTTOM_NAV_ITEM_DATA[4].path}
        onClick={handleLinkClick}
      >
        {pathname === '/user' ? <MypageActive /> : <Mypage />}
        <BottomNavLabel className={pathname === '/user' ? 'active' : ''}>
          {BOTTOM_NAV_ITEM_DATA[4].label}
        </BottomNavLabel>
      </BottomNavItemLink>
    </Root>
  )
}

export default BottomNav
