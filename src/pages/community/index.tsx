import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityContainer, QuestionListWrapper } from './sytles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import ScrollTabs from '../../components/Tabs/ScrollTabs/ScrollTabs'
import useQuestionListQuery from '../../apis/question/hooks/useQuestionListQuery'
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem'
import { Line } from './detail/styles'

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
          <Search fill='black'></Search>
        </Header>
      </HeaderWrapper>
      <ScrollTabs
        tabList={tabList}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      ></ScrollTabs>
      <QuestionListWrapper>
        {tempData?.map((each, index) => {
          return (
            <>
              <QuestionListItem key={each.id} item={each}></QuestionListItem>
              {index !== tempData.length - 1 && <Line></Line>}
            </>
          )
        })}
      </QuestionListWrapper>
    </CommunityContainer>
  )
}

export default Community
