import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { BottomNavItemData } from './BottomNav.type';
import { BOTTOM_NAV_ITEM_DATA, BOTTOM_NAV_PATH_INFO } from './BottomNav.util';
import { BottomNavItemLink, BottomNavLabel, Root } from './styles'

const BottomNav = () => {

  const {pathname} = useLocation();

  const isOpen = useMemo(() => {
    return BOTTOM_NAV_PATH_INFO[pathname];
  },[pathname]);

  return (
    <Root isOpen={isOpen}>
      {BOTTOM_NAV_ITEM_DATA.map((item: BottomNavItemData) => (
        <BottomNavItemLink key={item.path} to={item.path}>
          <BottomNavLabel>{item.label}</BottomNavLabel>
        </BottomNavItemLink>
      ))}
    </Root>
  );
}

export default BottomNav;
