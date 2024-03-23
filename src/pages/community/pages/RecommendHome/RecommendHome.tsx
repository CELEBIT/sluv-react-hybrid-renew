import React, { useEffect, useRef, useState } from 'react'
import {
  CommunityPageContainer,
  EmptyStateContainer,
  QuestionListWrapper,
  TabContainer,
} from '../../styles'
import { HeaderWrapper } from '../../../user/styles'
import Header from '../../../../components/Header/Header'
import { ComponentContainer } from '../../../home/styles'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import WriteCommunityItemButton from '../../components/WriteCommunityItemButton/WriteCommunityItemButton'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import { Line } from '../../detail/styles'
import { ReactComponent as RecommendHomeBanner } from '../../../../assets/CommunityEachBanner/RecommendBanner.svg'
import EmptyState from '../../../../components/EmptyState'
import ButtonSmall from '../../../../components/ButtonSmall/ButtonSmall'
import { useNavigate } from 'react-router-dom'

const RecommendItem = () => {
  const navigate = useNavigate()
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string | null>(null)

  const { getQuestionRecommendList } = useQuestionListQuery()
  const { data } = getQuestionRecommendList(selectedTab ? selectedTab : undefined)
  const tempData = data?.pages[0].content

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
        <RecommendHomeBanner style={{ flexShrink: 0 }}></RecommendHomeBanner>
        <TabContainer ref={stickyRef}>
          <BlackFilter isSelected={selectedTab === null} onClick={() => setSelectedTab(null)}>
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
          <BlackFilter
            isSelected={selectedTab === '선물템'}
            onClick={() => setSelectedTab('선물템')}
          >
            선물템
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '신박템'}
            onClick={() => setSelectedTab('신박템')}
          >
            신박템
          </BlackFilter>
          <BlackFilter isSelected={selectedTab === '기타'} onClick={() => setSelectedTab('기타')}>
            기타
          </BlackFilter>
        </TabContainer>
        {(tempData?.length ?? 0) > 0 ? (
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
        ) : (
          <EmptyStateContainer>
            <EmptyState
              icon='comment'
              title='‘추천해 줘’ 게시글이 없어요'
              subtitle='궁금한 것을 물어보며 추천받아 보아요'
            >
              <ButtonSmall
                text='질문하러 가기'
                type='pri'
                onClick={() => navigate('/community/create/recommend')}
              />
            </EmptyState>
          </EmptyStateContainer>
        )}
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default RecommendItem
