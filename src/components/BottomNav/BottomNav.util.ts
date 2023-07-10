import { BottomNavItemData, pathInfo } from './BottomNav.type'

// BottomNav 데이터 배열
export const BOTTOM_NAV_ITEM_DATA: Array<BottomNavItemData> = [
  { path: '/', label: '홈' },
  { path: '/community', label: '커뮤니티' },
  { path: '/item/create', label: '정보공유' },
  { path: '/closet', label: '옷장' },
  { path: '/user', label: '마이' },
]

// 특정 path에서 BottomNav Open 여부 데이터 객체
export const BOTTOM_NAV_PATH_INFO: pathInfo = {
  '/': true,
  '/community': true,
  '/closet': true,
  '/user': true,
}
