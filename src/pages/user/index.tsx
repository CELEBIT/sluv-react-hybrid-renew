import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import UserProfile from './components/UserProfile/UserProfile'
import Tabs from '../../components/Tabs'
import { Divider } from '../item/detail/styles'
import {
  BottomInfo,
  CardWrapper,
  CommunityCard,
  ContentContainer,
  ContentTitle,
  Count,
  EachContentWrapper,
  HeaderWrapper,
  ItemCard,
  ItemListContainer,
  ItemPreviewImg,
  Menu,
  PageContainer,
  PreviewWrapper,
  StickyTabContainer,
} from './styles'
import UserItem from './components/UserItem/UserItem'
import UserCloset from './components/UserCloset/UserCloset'
import { useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as Heart } from '../../assets/like_off_24.svg'
import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import UserUpload from './components/UserUpload/UserUpload'

import { ReactComponent as Home } from '../../assets/home_24.svg'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as ShowMore } from '../../assets/add_24.svg'
import { ReactComponent as Setting } from '../../assets/setting_24.svg'
import { ReactComponent as Upload } from '../../assets/share_24.svg'
import { Common } from '../../components/styles'
import { modals } from '../../components/Modals'
import useModals from '../../components/Modals/hooks/useModals'
import { useSetRecoilState } from 'recoil'
import { RequestEditItemState } from '../item/editRequest'

const User = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedTab, setSelectedTab] = useState('item')
  const tabList = [
    { id: 'item', tabName: '아이템' },
    { id: 'closet', tabName: '옷장' },
  ]

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
      openModal(modals.UserModal, { userName: data?.userInfo.nickName || '' })
    }
    return (
      <PageContainer>
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={true}>
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
            <Tabs
              tabList={tabList}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            ></Tabs>
          </StickyTabContainer>
          {selectedTab === 'item' ? <UserItem></UserItem> : <UserCloset></UserCloset>}
        </ContentContainer>
      </PageContainer>
    )
  } else {
    const {
      getMypageInfo: { data },
    } = useUserMypageQuery()
    return (
      <PageContainer>
        <HeaderWrapper>
          <Header isModalHeader={false} hasArrow={true} title='마이페이지'>
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
              <Heart></Heart>최근 본 컨텐츠
            </Menu>
            <Menu onClick={() => navigate('./like/item')}>
              <Heart></Heart>좋아요한 아이템
            </Menu>
            <Menu onClick={() => navigate('./like/community')}>
              <Heart></Heart>좋아요한 커뮤니티
            </Menu>
          </EachContentWrapper>
          <Divider></Divider>
          <EachContentWrapper>
            <ContentTitle>도움</ContentTitle>
            <Menu onClick={() => navigate('/help')}>
              <Heart></Heart>문의하기
            </Menu>
            <Menu onClick={() => navigate('/notice')}>
              <Heart></Heart>공지사항
            </Menu>
          </EachContentWrapper>
        </ContentContainer>
      </PageContainer>
    )
  }
}

export default User
