import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityPageContainer, QuestionListWrapper } from './sytles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as NoticeOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as NoticeOff } from '../../assets/bell_off_24.svg'
import useQuestionListQuery from '../../apis/question/hooks/useQuestionListQuery'
import WriteCommunityItemButton from './components/WriteCommunityItemButton/WriteCommunityItemButton'
import BannerItemsList from './components/BannerItems/BannerItemsList'
import Menu from './components/Menu/Menu'
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem'
import { Line } from './detail/styles'
import { ComponentContainer } from '../home/styles'
import { throttle } from 'lodash'

const Community = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('Total')
  const { getQuestionList } = useQuestionListQuery(selectedTab)
  const { data } = getQuestionList()
  const tempData = data?.pages[0].content
  const tabList = [
    { id: 'Total', tabName: '전체' },
    { id: 'Find', tabName: '찾아주세요' },
    { id: 'How', tabName: '이거 어때' },
    { id: 'Buy', tabName: '이 중에 뭐 살까' },
    { id: 'Recommend', tabName: '추천해 줘' },
  ]

  return (
    <CommunityPageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} title='커뮤니티' hasArrow={false}>
          <Search fill='black' onClick={() => navigate('/search')}></Search>
          <NoticeOff></NoticeOff>
        </Header>
      </HeaderWrapper>
      <ComponentContainer>
        <BannerItemsList></BannerItemsList>
        <Menu></Menu>
        <QuestionListWrapper>
          {tempData?.map((each, index) => {
            return (
              <>
                <QuestionListItem key={each.id} item={each} detail={true}></QuestionListItem>
                {index !== tempData.length - 1 && <Line></Line>}
              </>
            )
          })}
        </QuestionListWrapper>
        <WriteCommunityItemButton></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default Community
