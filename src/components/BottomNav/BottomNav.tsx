import React from 'react'
import { BottomNavItemLink, BottomNavLabel, Root } from './styles'

export type BottomNavItemData = {
  path: string;
  label: string;
};

export const BOTTOM_NAV_ITEM_DATA: Array<BottomNavItemData> = [
  { path: '/home', label: '홈' },
  { path: '/community', label: '커뮤니티' },
  { path: '/temp1', label: '임시1' },
  { path: '/closet', label: '옷장' },
  { path: '/temp2', label: '임시2' },
]

const BottomNav = () => {
  return (
    <Root>
      {BOTTOM_NAV_ITEM_DATA.map((item: BottomNavItemData) => (
        <BottomNavItemLink key={item.path} to={item.path}>
          <BottomNavLabel>{item.label}</BottomNavLabel>
        </BottomNavItemLink>
      ))}
    </Root>
  );
}

export default BottomNav
