import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityContainer, QuestionListWrapper } from './sytles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as NoticeOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as NoticeOff } from '../../assets/bell_off_24.svg'
import useQuestionListQuery from '../../apis/question/hooks/useQuestionListQuery'
import WriteCommunityItemButton from './components/WriteCommunityItemButton/WriteCommunityItemButton'
import BannerItemsList from './components/BannerItems/BannerItemsList'
import Menu from './components/Menu/Menu'

const Community = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('Total')
  // const {
  //   getHotSluver: { data: userList },
  // } = useGetHotSluverQuery(selectedInterestCeleb ? selectedInterestCeleb : undefined)
  // console.log('userList', userList)
  const { getQuestionList } = useQuestionListQuery(selectedTab)
  const { data } = getQuestionList()
  const tempData = data?.pages[0].content
  console.log('tempData', tempData)
  const tabList = [
    { id: 'Total', tabName: '전체' },
    { id: 'Find', tabName: '찾아주세요' },
    { id: 'How', tabName: '이거 어때' },
    { id: 'Buy', tabName: '이 중에 뭐 살까' },
    { id: 'Recommend', tabName: '추천해 줘' },
  ]
  return (
    <CommunityContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} title='커뮤니티' hasArrow={false}>
          <Search fill='black' onClick={() => navigate('/search')}></Search>
          <NoticeOff></NoticeOff>
        </Header>
      </HeaderWrapper>
      <BannerItemsList></BannerItemsList>
      <Menu></Menu>
      <WriteCommunityItemButton></WriteCommunityItemButton>
    </CommunityContainer>
  )
}

export default Community
