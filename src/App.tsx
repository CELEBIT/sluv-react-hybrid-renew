import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav/BottomNav'
import * as S from './components/styles'

const loading = <div>화면을 불러오는 중 입니다.(App)</div>

// 에러 페이지
const Page404 = React.lazy(() => import('./pages/page404'))
const Page500 = React.lazy(() => import('./pages/page404'))

// 하단바 네비게이션 페이지
const Home = React.lazy(() => import('./pages/home'))
const Community = React.lazy(() => import('./pages/community'))
const ItemCreate = React.lazy(() => import('./pages/item/create'))
const Closet = React.lazy(() => import('./pages/closet'))
const User = React.lazy(() => import('./pages/user'))

const App = () => {
  return (
    <S.Root>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path='/404' element={<Page404 />} />
            <Route path='/500' element={<Page500 />} />
            <Route path='/' element={<Home />} />
            <Route path='/community' element={<Community />} />
            <Route path='/item/create' element={<ItemCreate />} />
            <Route path='/closet' element={<Closet />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </Suspense>
        {/* <Modals /> */}
        <BottomNav />
      </BrowserRouter>
    </S.Root>
  )
}

export default App
