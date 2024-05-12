import React, { useEffect, useState } from 'react'
import { UserContainerWithTab } from './styles'
import Header from '../../../../components/Header/Header'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Tabs from '../../../../components/Tabs'
import CommunityUpload from './CommunityUpload/CommunityUpload'
import CommentUpload from './CommentUpload/CommentUpload'
import { useNavigate } from 'react-router-dom'

const UserCommunity = () => {
  const navigate = useNavigate()
  const tabList = [
    { id: 'upload', tabName: '게시글' },
    { id: 'comment', tabName: '댓글' },
  ]

  const savedTab = sessionStorage.getItem('userCommunityTab') || 'upload'
  const [currentTab, setCurrentTab] = useState(savedTab)

  useEffect(() => {
    sessionStorage.setItem('userCommunityTab', currentTab)
  }, [currentTab])
  const onBackClick = () => {
    sessionStorage.removeItem('userCommunityTab')
    navigate(-1)
  }
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header
          title='커뮤니티'
          isModalHeader={false}
          hasArrow={true}
          backBtnClick={onBackClick}
        ></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <Tabs tabList={tabList} selectedTab={currentTab} setSelectedTab={setCurrentTab}></Tabs>
        {currentTab === 'upload' && <CommunityUpload></CommunityUpload>}
        {currentTab === 'comment' && <CommentUpload></CommentUpload>}
      </ContentFullContainer>
    </UserContainerWithTab>
  )
}

export default UserCommunity
