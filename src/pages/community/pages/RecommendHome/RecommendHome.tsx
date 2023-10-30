import React, { useEffect, useRef, useState } from 'react'
import { CommunityPageContainer, QuestionListWrapper, TabContainer } from '../../sytles'
import { HeaderWrapper } from '../../../user/styles'
import Header from '../../../../components/Header/Header'
import { ComponentContainer } from '../../../home/styles'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import WriteCommunityItemButton from '../../components/WriteCommunityItemButton/WriteCommunityItemButton'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import { Line } from '../../detail/styles'
import { ReactComponent as RecommendHomeBanner } from '../../../../assets/CommunityEachBanner/RecommendBanner.svg'

const RecommendItem = () => {
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string>('')

  const { getQuestionRecommendList } = useQuestionListQuery()
  const { data } = getQuestionRecommendList(selectedTab)
  const tempData = data?.pages[0].content
  console.log(tempData)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
        console.log(top)
        setIsStickyAtTop(Math.floor(top) <= 65)
      }
    }
    ComponentContainerRef.current?.addEventListener('scroll', handleScroll)
    return () => {
      ComponentContainerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [isStickyAtTop])

  return (
    <CommunityPageContainer>
      <HeaderWrapper>
        <Header
          isModalHeader={false}
          title={isStickyAtTop ? '추천해 줘' : ''}
          hasArrow={true}
        ></Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <RecommendHomeBanner></RecommendHomeBanner>
        <TabContainer ref={stickyRef}>
          <BlackFilter isSelected={selectedTab === ''} onClick={() => setSelectedTab('')}>
            전체
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '애착템'}
            onClick={() => setSelectedTab('애착템')}
          >
            애착템
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '입문템'}
            onClick={() => setSelectedTab('입문템')}
          >
            입문템
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '추천템'}
            onClick={() => setSelectedTab('추천템')}
          >
            추천템
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '가성비템'}
            onClick={() => setSelectedTab('가성비템')}
          >
            가성비템
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '후회없템'}
            onClick={() => setSelectedTab('후회없템')}
          >
            후회없템
          </BlackFilter>
        </TabContainer>
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
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default RecommendItem
