import React, { useState } from 'react'
import { UserContainerWithTab } from './styles'
import Header from '../../../../components/Header/Header'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Tabs from '../../../../components/Tabs'
import CommunityUpload from './CommunityUpload/CommunityUpload'
import CommentUpload from './CommentUpload/CommentUpload'

const UserCommunity = () => {
  const tabList = [
    { id: 'upload', tabName: '게시글' },
    { id: 'comment', tabName: '댓글' },
  ]
  const [followTab, setFollowTab] = useState('upload')
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header title='커뮤니티' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <Tabs tabList={tabList} selectedTab={followTab} setSelectedTab={setFollowTab}></Tabs>
        {followTab === 'upload' && <CommunityUpload></CommunityUpload>}
        {followTab === 'comment' && <CommentUpload></CommentUpload>}
      </ContentFullContainer>
    </UserContainerWithTab>
  )
}

export default UserCommunity
