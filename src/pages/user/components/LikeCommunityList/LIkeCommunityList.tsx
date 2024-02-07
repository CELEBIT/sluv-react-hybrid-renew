import React, { useState } from 'react'
import { UserContainerWithTab } from '../UserCommunity/styles'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Header from '../../../../components/Header/Header'
import Tabs from '../../../../components/Tabs'
import LikeCommunityQuestion from './LikeCommunityQuestion/LikeCommunityQuestion'
import LikeCommunityComment from './LikeCommunityComment/LikeCommunityComment'

const LIkeCommunityList = () => {
  const tabList = [
    { id: 'question', tabName: '게시글' },
    { id: 'comment', tabName: '댓글' },
  ]
  const [followTab, setFollowTab] = useState('question')
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header title='좋아요한 커뮤니티' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <Tabs tabList={tabList} selectedTab={followTab} setSelectedTab={setFollowTab}></Tabs>
        {followTab === 'question' && <LikeCommunityQuestion></LikeCommunityQuestion>}
        {followTab === 'comment' && <LikeCommunityComment></LikeCommunityComment>}
      </ContentFullContainer>
    </UserContainerWithTab>
  )
}

export default LIkeCommunityList
