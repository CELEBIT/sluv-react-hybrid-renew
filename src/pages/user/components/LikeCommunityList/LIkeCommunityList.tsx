import React, { useEffect, useState } from 'react'
import { UserContainerWithTab } from '../UserCommunity/styles'
import { ContentFullContainer, HeaderWrapper } from '../../styles'
import Header from '../../../../components/Header/Header'
import Tabs from '../../../../components/Tabs'
import LikeCommunityQuestion from './LikeCommunityQuestion/LikeCommunityQuestion'
import LikeCommunityComment from './LikeCommunityComment/LikeCommunityComment'
import { useNavigate } from 'react-router-dom'

const LIkeCommunityList = () => {
  const navigate = useNavigate()
  const tabList = [
    { id: 'question', tabName: '게시글' },
    { id: 'comment', tabName: '댓글' },
  ]
  const savedTab = sessionStorage.getItem('likeCommunityTab') || 'question'
  const [currentTab, setCurrentTab] = useState(savedTab)

  useEffect(() => {
    sessionStorage.setItem('likeCommunityTab', currentTab)
  }, [currentTab])

  const onBackClick = () => {
    sessionStorage.removeItem('likeCommunityTab')
    navigate(-1)
  }
  return (
    <UserContainerWithTab>
      <HeaderWrapper>
        <Header
          title='좋아요한 커뮤니티'
          isModalHeader={false}
          hasArrow={true}
          backBtnClick={onBackClick}
        ></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        <Tabs tabList={tabList} selectedTab={currentTab} setSelectedTab={setCurrentTab}></Tabs>
        {currentTab === 'question' && <LikeCommunityQuestion></LikeCommunityQuestion>}
        {currentTab === 'comment' && <LikeCommunityComment></LikeCommunityComment>}
      </ContentFullContainer>
    </UserContainerWithTab>
  )
}

export default LIkeCommunityList
