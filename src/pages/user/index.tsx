import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Tabs from '../../components/Tabs'
import { Divider } from '../item/detail/styles'
import UserCloset from './components/UserCloset/UserCloset'
import UserItem from './components/UserItem/UserItem'
import UserProfile from './components/UserProfile/UserProfile'
import {
  ContentContainer,
  ContentTitle,
  EachContentWrapper,
  HeaderWrapper,
  Menu,
  PageContainer,
  StickyTabContainer,
} from './styles'

import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import { ReactComponent as Recent } from '../../assets/BottomModal/recent_24.svg'
import { ReactComponent as Speaker } from '../../assets/BottomModal/speaker_24.svg'
import { ReactComponent as Info } from '../../assets/info_24.svg'
import { ReactComponent as Heart } from '../../assets/like_black_24.svg'
import UserUpload from './components/UserUpload/UserUpload'

import { useSetRecoilState } from 'recoil'
import { ReactComponent as ShowMore } from '../../assets/add_24.svg'
import { ReactComponent as Home } from '../../assets/home_24.svg'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as Setting } from '../../assets/setting_24.svg'
import EmptyState from '../../components/EmptyState'
import { modals } from '../../components/Modals'
import useModals from '../../components/Modals/hooks/useModals'
import { Common } from '../../components/styles'
import { RequestEditItemState } from '../item/editRequest'
import { EmptyStateWrapper } from './components/FollowList/Follower/Follower'

const User = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const tabList = [
    { id: 'item', tabName: '아이템' },
    { id: 'closet', tabName: '옷장' },
  ]

  const savedTab = sessionStorage.getItem('userMypageTab') || 'item'
  const [currentTab, setCurrentTab] = useState(savedTab)

  useEffect(() => {
    sessionStorage.setItem('userMypageTab', currentTab)
  }, [currentTab])
  const onBackClick = () => {
    sessionStorage.removeItem('userMypageTab')
    navigate(-1)
  }

  const { openModal } = useModals()
  const setEditReportItemState = useSetRecoilState(RequestEditItemState)

  if (id) {
    const { getOtherUserMypageInfo } = useUserMypageQuery()
    const { data } = getOtherUserMypageInfo(Number(id))
    const onClickShowMore = () => {
      setEditReportItemState({
        itemId: 0,
        itemWriterId: data?.userInfo.id,
        itemWriterName: data?.userInfo.nickName,
      })
      if (data)
        openModal(modals.UserModal, {
          userName: data.userInfo.nickName,
          userId: Number(id),
          blockStatus: data.blockStatus,
        })
    }
    return (
      <PageContainer>
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={true} backBtnClick={onBackClick}>
            <div className='headerRight'>
              <Home onClick={() => navigate('/home')} />
              <Search fill={Common.colors.BK} onClick={() => navigate('/search')}></Search>
              <ShowMore onClick={() => onClickShowMore()}></ShowMore>
            </div>
          </Header>
        </HeaderWrapper>
        <ContentContainer>
          <UserProfile></UserProfile>
          <StickyTabContainer>
            <Tabs tabList={tabList} selectedTab={currentTab} setSelectedTab={setCurrentTab}></Tabs>
          </StickyTabContainer>
          {data && data.blockStatus ? (
            <EmptyStateWrapper>
              <EmptyState
                icon='alert'
                title='차단된 사용자에요.'
                subtitle='해당 사용자의 콘텐츠를 보려면
차단을 해제해 주세요'
              ></EmptyState>
            </EmptyStateWrapper>
          ) : (
            <>{currentTab === 'item' ? <UserItem></UserItem> : <UserCloset></UserCloset>}</>
          )}
        </ContentContainer>
      </PageContainer>
    )
  } else {
    const { getMypageInfo } = useUserMypageQuery()
    const { data } = getMypageInfo()

    return (
      <PageContainer>
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={false} title='마이페이지'>
            <div className='headerRight'>
              <Setting onClick={() => navigate('/settings')} />
              {/* <Upload stroke={Common.colors.BK}></Upload> */}
            </div>
          </Header>
        </HeaderWrapper>
        <ContentContainer>
          <UserProfile></UserProfile>
          <Divider></Divider>
          <UserUpload data={data}></UserUpload>
          <Divider></Divider>
          <EachContentWrapper>
            <ContentTitle>나의 활동</ContentTitle>
            <Menu onClick={() => navigate('./recent-view')}>
              <Recent></Recent>최근 본 컨텐츠
            </Menu>
            <Menu onClick={() => navigate('./like/item')}>
              <Heart fill={Common.colors.BK}></Heart>좋아요한 아이템
            </Menu>
            <Menu onClick={() => navigate('./like/community')}>
              <Heart fill={Common.colors.BK}></Heart>좋아요한 커뮤니티
            </Menu>
          </EachContentWrapper>
          <Divider></Divider>
          <EachContentWrapper>
            <ContentTitle>도움</ContentTitle>
            <Menu onClick={() => navigate('/help')}>
              <Info></Info>문의하기
            </Menu>
            <Menu onClick={() => navigate('/notice')}>
              <Speaker></Speaker>공지사항
            </Menu>
          </EachContentWrapper>
        </ContentContainer>
      </PageContainer>
    )
  }
}

export default User
