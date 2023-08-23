import React, { useState } from 'react'
import { UserContainerWithTab } from '../UserCommunity/styles'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Header from '../../../../components/Header/Header'
import Tabs from '../../../../components/Tabs'
import RecentViewItem from './RecentViewItem/RecentViewItem'
import RecentViewCommunity from './RecentViewCommunity/RecentViewCommunity'

const RecentView = () => {
  const tabList = [
    { id: 'item', tabName: '아이템' },
    { id: 'community', tabName: '커뮤니티' },
  ]
  const [followTab, setFollowTab] = useState('item')
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header title='최근 본 컨텐츠' isModalHeader={false} hasArrow={true}></Header>
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
