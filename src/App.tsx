import React, { Suspense, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav/BottomNav'
import Modals from './components/Modals'
import * as S from './components/styles'
import { queryToObject } from './utils/utility'
import storage from './utils/storage'
import SelectItemOrPhoto from './components/SelectItemOrPhoto'

import Loading from './components/Loading'
import { bridgeProxyAdapter } from './utils/bridge'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

bridgeProxyAdapter()

const loading = <Loading />

// 에러 페이지
const Page404 = React.lazy(() => import('./pages/page404'))
const Page500 = React.lazy(() => import('./pages/page404'))

// 하단바 네비게이션 페이지
const Home = React.lazy(() => import('./pages/home'))
const Community = React.lazy(() => import('./pages/community'))
const ItemCreate = React.lazy(() => import('./pages/item/create'))
const Closet = React.lazy(() => import('./pages/closet'))
const User = React.lazy(() => import('./pages/user'))

// 관심셀럽 선택 페이지
const SelectCeleb = React.lazy(() => import('./pages/selectInterestCeleb'))
const SignupComplete = React.lazy(() => import('./pages/selectInterestCeleb/SignupComplete'))

// 아이템 게시글 작성 관련 페이지
const TemporaryStorage = React.lazy(() => import('./pages/item/temporary-storage'))

// 아이템 업로드 상세 페이지
const AddInfo = React.lazy(() => import('./pages/item/addInfo'))
const AddLink = React.lazy(() => import('./pages/item/addLink'))
const ItemDetail = React.lazy(() => import('./pages/item/detail'))
const ItemConfirm = React.lazy(() => import('./pages/item/confirm'))

// 아이템 신고 / 수정요청
const EditRequest = React.lazy(() => import('./pages/item/editRequest'))
const RequestReason = React.lazy(() => import('./pages/item/editRequest/requestReason'))

// 커뮤니티 세부 페이지
const FindRequest = React.lazy(() => import('./pages/community/findRequest'))
const Question = React.lazy(() => import('./pages/community/question'))
const CommunityDetail = React.lazy(() => import('./pages/community/detail/CommunityDetail'))
const CommentItemPhoto = React.lazy(() => import('./components/SelectItemOrPhoto/CommentItemPhoto'))
const CommentUpload = React.lazy(() => import('./pages/community/detail/components/CommentUpload'))
const AddSubComment = React.lazy(
  () => import('./pages/community/detail/components/AddSubComment/AddSubComment'),
)
// 검색
const Search = React.lazy(() => import('./pages/search'))
const SearchResult = React.lazy(() => import('./pages/search/SearchResult'))

// 옷장

const ClosetCreatePage = React.lazy(() => import('./pages/closet/create'))

const App = () => {
  useLayoutEffect(() => {
    console.log(window.location.search)
    console.log(window.location.hash)
    console.log(window.location.search.split('?'))
    const payload = {
      ...queryToObject(window.location.search.split('?')[1]),
      ...queryToObject(window.location.hash.split('#')[1]),
    }
    console.log('payload', payload)
    if (payload.AccessToken) {
      storage.set('accessToken', payload.AccessToken)
      storage.set('device', payload.device)
      storage.set('version', payload.VersionNumber)
    } else {
      storage.set(
        'accessToken',
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc5ODk4NzE5LCJleHAiOjE3MTE0MzQ3MTl9.jvFrmgt9YVPpqL2k1r9hxTSsMm1sODAdRzroNVx-RAo',
      )
    }
  }, [])

  return (
    <S.Root>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path='/404' element={<Page404 />} />
            <Route path='/500' element={<Page500 />} />
            {/* 홈 */}
            <Route path='/' element={<Home />} />
            {/* 홈 */}
            <Route path='/select-celeb' element={<SelectCeleb />} />
            <Route path='/select-celeb/complete' element={<SignupComplete />} />
            {/* 커뮤니티 */}
            <Route path='/community' element={<Community />} />
            <Route path='/community/find-request' element={<FindRequest />} />
            <Route path='/community/find-request/edit' element={<FindRequest />} />
            <Route path='/community/question' element={<Question />} />
            <Route path='/community/question/edit' element={<Question />} />
            <Route path='/community/select-item-photo' element={<SelectItemOrPhoto />} />
            <Route path='/community/comment/comment-item-photo' element={<CommentItemPhoto />} />
            <Route path='/community/comment/upload' element={<CommentUpload />} />
            <Route path='/community/comment/subcomment' element={<AddSubComment />} />
            <Route path='/community/detail/:id' element={<CommunityDetail />} />
            <Route path='/community/detail/:id/comment/:commentid' element={<CommunityDetail />} />
            <Route path='/community/detail/report-question' element={<EditRequest />} />
            <Route path='/community/detail/report-question/reason' element={<RequestReason />} />
            <Route path='/community/detail/report-user' element={<EditRequest />} />
            <Route path='/community/detail/report-user/reason' element={<RequestReason />} />
            {/* 정보 공유하기 */}
            <Route path='/item/create' element={<ItemCreate />} />
            <Route path='/item/create/addinfo' element={<AddInfo />} />
            <Route path='/item/create/addlink' element={<AddLink />} />
            <Route path='/item/create/confirm' element={<ItemConfirm />} />
            <Route path='/item/create/temporary-storage' element={<TemporaryStorage />} />
            <Route path='/item/detail/:id' element={<ItemDetail />} />
            <Route path='/item/detail/request-edit' element={<EditRequest />} />
            <Route path='/item/detail/request-edit/reason' element={<RequestReason />} />
            <Route path='/item/detail/report-item' element={<EditRequest />} />
            <Route path='/item/detail/report-item/reason' element={<RequestReason />} />
            <Route path='/item/detail/report-user' element={<EditRequest />} />
            <Route path='/item/detail/report-user/reason' element={<RequestReason />} />
            {/* 검색 */}
            <Route path='/search' element={<Search />} />
            <Route path='/search/result' element={<SearchResult />} />
            {/* 옷장 */}
            <Route path='/closet' element={<Closet />} />
            <Route path={'/closet/create'} element={<ClosetCreatePage />} />

            {/* 마이페이지 */}
            <Route path='/user' element={<User />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/user/select-celeb' element={<SelectCeleb />} />
          </Routes>
        </Suspense>
        <Modals />
        <BottomNav />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </S.Root>
  )
}

export default App
