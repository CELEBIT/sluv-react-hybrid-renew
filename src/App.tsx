import React, { Suspense, useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav/BottomNav'
import Modals from './components/Modals'
import * as S from './components/styles'
import { queryToObject } from './utils/utility'
import storage from './utils/storage'

import Loading from './components/Loading'
// import { bridgeProxyAdapter } from './utils/bridge'
import ClosetBoxEditPage from './pages/closet/edit'
import ClosetDetailPage from './pages/closet/detail'

// bridgeProxyAdapter()

const loading = <Loading />

// 앱 로드
const AppLoad = React.lazy(() => import('./pages/appLoad'))

// 에러 페이지
const Page404 = React.lazy(() => import('./pages/page404'))
const Page500 = React.lazy(() => import('./pages/page404'))

// 하단바 네비게이션 페이지
const Home = React.lazy(() => import('./pages/home'))
const Community = React.lazy(() => import('./pages/community'))
const ItemCreate = React.lazy(() => import('./pages/item/create'))
const Closet = React.lazy(() => import('./pages/closet'))
const User = React.lazy(() => import('./pages/user'))

// 홈 사용 가이드
const Guide = React.lazy(() => import('./pages/home/Guide/index'))
const Collection = React.lazy(() => import('./pages/home/Collection/index'))

// 회원가입 페이지
const SignUp = React.lazy(() => import('./pages/signup/SignUp'))

// 관심셀럽 선택 페이지
const SelectInterestCeleb = React.lazy(() => import('./pages/selectInterestCeleb'))

// 아이템 게시글 작성 관련 페이지
const TemporaryStorage = React.lazy(() => import('./pages/item/temporary-storage'))

// 아이템 업로드 상세 페이지
const AddInfo = React.lazy(() => import('./pages/item/addInfo'))
const AddLink = React.lazy(() => import('./pages/item/addLink'))
const ItemDetail = React.lazy(() => import('./pages/item/detail'))
const ItemEdit = React.lazy(() => import('./pages/item/edit'))
const ItemConfirm = React.lazy(() => import('./pages/item/confirm'))

// 아이템 신고 / 수정요청
const EditRequest = React.lazy(() => import('./pages/item/editRequest'))
const RequestReason = React.lazy(() => import('./pages/item/editRequest/requestReason'))

// 커뮤니티 세부 페이지

const FindHome = React.lazy(() => import('./pages/community/pages/FindHome/FindHome'))
const HowAboutHome = React.lazy(() => import('./pages/community/pages/HowAboutHome/HowAboutHome'))
const RecommendHome = React.lazy(
  () => import('./pages/community/pages/RecommendHome/RecommendHome'),
)
const BuyHome = React.lazy(() => import('./pages/community/pages/BuyHome/BuyHome'))

const FindRequest = React.lazy(() => import('./pages/community/CreateCommunity/findRequest'))
const Question = React.lazy(() => import('./pages/community/CreateCommunity/question'))
const CreateBuy = React.lazy(() => import('./pages/community/CreateCommunity/question/whichOne'))
const CreateHowabout = React.lazy(
  () => import('./pages/community/CreateCommunity/question/howAboutThis'),
)
const CreateRecommend = React.lazy(
  () => import('./pages/community/CreateCommunity/question/recommend'),
)

const SelectItemOrPhoto = React.lazy(() => import('./components/SelectItemOrPhoto'))

const CommunityDetail = React.lazy(() => import('./pages/community/detail/CommunityDetail'))
const CommentItemPhoto = React.lazy(() => import('./components/SelectItemOrPhoto/CommentItemPhoto'))
const CommentUpload = React.lazy(() => import('./pages/community/detail/components/CommentUpload'))
// const EditComment = React.lazy(
//   () => import('./pages/community/detail/components/EditComment/EditComment'),
// )
const AddSubComment = React.lazy(
  () => import('./pages/community/detail/components/AddSubComment/AddSubComment'),
)
// 검색
const Search = React.lazy(() => import('./pages/search'))
const SearchResult = React.lazy(() => import('./pages/search/SearchResult'))
// 옷장
const ClosetEditAndSortPage = React.lazy(() => import('./pages/closet/deleteAndSort'))
const ClosetCreatePage = React.lazy(() => import('./pages/closet/create'))

// 마이페이지
const FollowList = React.lazy(() => import('./pages/user/components/FollowList/FollowList'))
const UserItem = React.lazy(() => import('./pages/user/components/UserItem/UserItem'))
const UserCommunity = React.lazy(
  () => import('./pages/user/components/UserCommunity/UserCommunity'),
)
const LikeItem = React.lazy(() => import('./pages/user/components/LikeItemList/LikeItemList'))
const LikeCommunity = React.lazy(
  () => import('./pages/user/components/LikeCommunityList/LIkeCommunityList'),
)
const RecentView = React.lazy(() => import('./pages/user/components/RecentView/RecentView'))
const Help = React.lazy(() => import('./pages/user/components/Help/Help'))
const Notice = React.lazy(() => import('./pages/user/components/Notice/Notice'))
const NoticeDetail = React.lazy(
  () => import('./pages/user/components/Notice/NoticeDetail/NoticeDetail'),
)

const Settings = React.lazy(() => import('./pages/settings/index'))
const EditProfile = React.lazy(() => import('./components/Profile/Profile'))
const Privacy = React.lazy(() => import('./pages/settings/components/Privacy/Privacy'))
const TermsOfUse = React.lazy(() => import('./pages/settings/components/TermsOfUse/TermsOfUse'))
const Marketing = React.lazy(() => import('./pages/settings/components/Marketing/Marketing'))

// 아이템 신고 / 수정요청
const RequestWithdraw = React.lazy(() => import('./pages/settings/RequestWithdraw/index'))
const WithdrawReason = React.lazy(
  () => import('./pages/settings/RequestWithdraw/WithdrawReason/index'),
)

// 알림
const Notifications = React.lazy(() => import('./pages/notifications/index'))

import Modal from 'react-modal'
import { HelmetProvider } from 'react-helmet-async'
import MetaTag from './utils/Share/MetaTag'
import { StyledToastContainer } from '.'

Modal.setAppElement('#root')
const App = () => {
  useLayoutEffect(() => {
    // console.log(window.location.search)
    // console.log(window.location.hash)
    // console.log(window.location.search.split('?'))
    const payload = {
      ...queryToObject(window.location.search.split('?')[1]),
      ...queryToObject(window.location.hash.split('&')[1]),
    }
    console.log('payload', payload)
    if (payload.accessToken && payload.userStatus) {
      storage.set('accessToken', payload.accessToken)
      storage.set('userStatus', payload.userStatus)
    }
    // else {
    //   storage.set(
    //     'accessToken',
    //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzExNDM2MjIyLCJleHAiOjE3NDI5NzIyMjJ9.deoUzbNon7-F6uLXi2-sx7N7Gp9XMeTOWUBl2yU1uHY',
    //   )
    // }
  }, [])

  return (
    <S.Root>
      <MetaTag />
      <StyledToastContainer
        autoClose={1500}
        hideProgressBar={true}
        closeButton={false}
        closeOnClick={false}
        pauseOnHover={false}
        limit={1}
      />
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path='/404' element={<Page404 />} />
            <Route path='/500' element={<Page500 />} />
            {/* 홈 */}
            <Route path='/home' element={<Home />} />
            <Route path='/home/guide' element={<Guide />} />
            <Route path='/home/collection' element={<Collection />} />
            {/* 회원가입 */}
            <Route path='/' element={<AppLoad />} />

            <Route path='/signup' element={<SignUp />} />
            {/* 관심셀럽선택 */}
            {/* <Route path='/select-celeb' element={<SelectInterestCeleb />} />
            <Route path='/select-celeb/complete' element={<SignupComplete />} /> */}
            {/* 커뮤니티 */}
            <Route path='/community' element={<Community />} />
            <Route path='/community/find' element={<FindHome />} />
            <Route path='/community/howabout' element={<HowAboutHome />} />
            <Route path='/community/recommend' element={<RecommendHome />} />
            <Route path='/community/buy' element={<BuyHome />} />
            <Route path='/community/create/find-request' element={<FindRequest />} />
            <Route path='/community/find-request/edit' element={<FindRequest />} />
            <Route path='/community/create' element={<Question />}>
              <Route path='buy' element={<CreateBuy />} />
              <Route path='howabout' element={<CreateHowabout />} />
              <Route path='recommend' element={<CreateRecommend />} />
            </Route>
            <Route path='/community/edit' element={<Question />}>
              <Route path='howabout' element={<CreateHowabout />} />
              <Route path='recommend' element={<CreateRecommend />} />
            </Route>
            {/* <Route path='/community/question/edit' element={<Question />} /> */}
            <Route path='/community/select-item-photo' element={<SelectItemOrPhoto />} />
            <Route path='/community/comment/comment-item-photo' element={<CommentItemPhoto />} />
            <Route path='/community/comment/upload' element={<CommentUpload />} />
            <Route path='/community/comment/edit' element={<CommentUpload />} />
            <Route path='/community/subcomment/upload' element={<CommentUpload />} />
            <Route path='/community/comment/subcomment' element={<AddSubComment />} />
            <Route path='/community/comment/report-comment' element={<EditRequest />} />
            <Route path='/community/comment/report-comment/reason' element={<RequestReason />} />
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
            {/* <Route path='/item/create/confirm' element={<ItemConfirm />} /> */}
            <Route path='/item/create/temporary-storage' element={<TemporaryStorage />} />

            <Route path='/item/edit/:id' element={<ItemEdit />} />
            <Route path='/item/edit/addinfo' element={<AddInfo />} />
            <Route path='/item/edit/addlink' element={<AddLink />} />

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
            <Route path={'/closet/create/'} element={<ClosetCreatePage isEditMode={false} />} />
            <Route path={'/closet/edit'} element={<ClosetBoxEditPage />} />
            <Route path={'/closet/deleteAndSort/'} element={<ClosetEditAndSortPage />} />
            <Route path={'/closet/detail'} element={<ClosetDetailPage />} />

            {/* 마이페이지 */}
            <Route path='/user' element={<User />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/user/select-celeb' element={<SelectInterestCeleb />} />
            <Route path='/user/followlist' element={<FollowList />} />
            <Route path='/user/followlist/:id' element={<FollowList />} />
            <Route path='/user/report-user' element={<EditRequest />} />
            <Route path='/user/report-user/reason' element={<RequestReason />} />

            {/* 마이페이지 나의 게시글 */}
            <Route path='/user/item' element={<UserItem />} />
            <Route path='/user/community' element={<UserCommunity />} />
            {/* 마이페이지 나의 활동 */}
            <Route path='/user/recent-view' element={<RecentView />} />
            <Route path='/user/like/item' element={<LikeItem />} />
            <Route path='/user/like/community' element={<LikeCommunity />} />
            {/* 마이페이지 도움 */}
            <Route path='/help' element={<Help />} />
            <Route path='/help/detail' element={<User />} />
            <Route path='/notice' element={<Notice />} />
            <Route path='/notice/:id' element={<NoticeDetail />} />
            {/* 마이페이지 설정 */}
            <Route path='/settings' element={<Settings />} />
            <Route path='/settings/privacy' element={<Privacy />} />
            <Route path='/settings/terms' element={<TermsOfUse />} />
            <Route path='/settings/marketing' element={<Marketing />} />
            <Route path='/settings/select-celeb' element={<SelectInterestCeleb />} />
            <Route path='/settings/edit-profile' element={<EditProfile />} />
            <Route path='/settings/withdraw' element={<RequestWithdraw />} />
            <Route path='/settings/withdraw/reason' element={<WithdrawReason />} />
            {/* 알림 */}
            <Route path='/notifications' element={<Notifications />} />
          </Routes>
        </Suspense>
        <Modals />
        <BottomNav />
      </BrowserRouter>
    </S.Root>
  )
}

export default App
