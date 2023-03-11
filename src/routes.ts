import React from 'react'

// 에러 페이지
const Page404 = React.lazy(() => import('./pages/page404'));
const Page500 = React.lazy(() => import('./pages/page500'));

// 하단바 네비게이션 페이지
const Home = React.lazy(() => import('./pages/home'));
const Community = React.lazy(() => import('./pages/community'));
const ItemCreate = React.lazy(() => import('./pages/item/create'));
const Closet = React.lazy(() => import('./pages/closet'));
const User = React.lazy(() => import('./pages/user'))


const routes = [
  { path: '/', element: Home },
  { path: '/community', element: Community },
  { path: '/item/create', element: ItemCreate },
  { path: '/closet', element: Closet },
  { path: '/user', element: User },
  { path: '/404', element: Page404 },
  { path: '/500', element: Page500 },
]

export default routes;
