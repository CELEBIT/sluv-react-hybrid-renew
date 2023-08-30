import React, { useState } from 'react'
import { FollowListContainer } from './styles'
import Header from '../../../../components/Header/Header'
import { ContentContainer, HeaderWrapper } from '../../styles'
import Tabs from '../../../../components/Tabs'
import Follower from './Follower/Follower'
import Following from './Following/Following'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedFollowTabState, selectedUserName } from '../UserProfile/UserProfile'

const FollowList = () => {
  const tabList = [
    { id: 'follower', tabName: '팔로워' },
    { id: 'following', tabName: '팔로잉' },
  ]
  const [followTab, setFollowTab] = useRecoilState(selectedFollowTabState)
  const userName = useRecoilValue(selectedUserName)
  return (
    <FollowListContainer>
      <HeaderWrapper>
        <Header title={userName} isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentContainer>
        <Tabs tabList={tabList} selectedTab={followTab} setSelectedTab={setFollowTab}></Tabs>
        {followTab === 'follower' && <Follower></Follower>}
        {followTab === 'following' && <Following></Following>}
      </ContentContainer>
    </FollowListContainer>
  )
}

export default FollowList
