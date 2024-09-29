import React, { useEffect, useState } from 'react'
import { UserContainerWithTab } from '../UserCommunity/styles'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Header from '../../../../components/Header/Header'
import Tabs from '../../../../components/Tabs'
import RecentViewItem from './RecentViewItem/RecentViewItem'
import RecentViewCommunity from './RecentViewCommunity/RecentViewCommunity'
import { useNavigate } from 'react-router-dom'

const RecentView = () => {
  const navigate = useNavigate()

  const tabList = [
    { id: 'item', tabName: '아이템' },
    { id: 'community', tabName: '커뮤니티' },
  ]
  // const [followTab, setFollowTab] = useState('item')
  // sessionStorage에서 이전에 선택했던 탭 상태를 읽어옵니다.
  const savedTab = sessionStorage.getItem('recentViewTab') || 'item'
  const [followTab, setFollowTab] = useState(savedTab)

  // 선택된 탭이 변경될 때마다 이를 sessionStorage에 저장합니다.
  useEffect(() => {
    sessionStorage.setItem('recentViewTab', followTab)
  }, [followTab])
  const onBackClick = () => {
    sessionStorage.removeItem('recentViewTab')
    navigate(-1)
  }
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header
          title='최근 본 컨텐츠'
          isModalHeader={false}
          hasArrow={true}
          backBtnClick={onBackClick}
        ></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <Tabs tabList={tabList} selectedTab={followTab} setSelectedTab={setFollowTab}></Tabs>
        {followTab === 'item' && <RecentViewItem></RecentViewItem>}
        {followTab === 'community' && <RecentViewCommunity></RecentViewCommunity>}
      </ContentFullContainer>
    </UserContainerWithTab>
  )
}

export default RecentView
