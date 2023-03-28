// BottomNav 개별 Item에 들어갈 데이터 TYPE
export type BottomNavItemData = {
  path: string
  label: string
}

// 특정 path에서 BottomNav Open 여부 결정 TYPE
export type pathInfo = Record<string, boolean>
