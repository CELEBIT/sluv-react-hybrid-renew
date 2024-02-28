import React, { useEffect, useRef, useState } from 'react'
import { CommunityPageContainer, QuestionListWrapper, TabContainer } from '../../styles'
import { HeaderWrapper } from '../../../user/styles'
import Header from '../../../../components/Header/Header'
import { ComponentContainer } from '../../../home/styles'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import WriteCommunityItemButton from '../../components/WriteCommunityItemButton/WriteCommunityItemButton'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import { Line } from '../../detail/styles'
import { ReactComponent as BuyHomeBanner } from '../../../../assets/CommunityEachBanner/BuyBanner.svg'
import EmptyState from '../../../../components/EmptyState'
import { EmptyStateWrapper } from '../../../user/components/FollowList/Follower/Follower'

const BuyHome = () => {
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string>('전체')

  const { getQuestionBuyList } = useQuestionListQuery()
  const { data } = getQuestionBuyList(selectedTab)
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
          title={isStickyAtTop ? '이 중에 뭐 살까' : ''}
          hasArrow={true}
        ></Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <BuyHomeBanner style={{ flexShrink: 0 }}></BuyHomeBanner>
        <TabContainer ref={stickyRef}>
          <BlackFilter isSelected={selectedTab === '전체'} onClick={() => setSelectedTab('전체')}>
            전체
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '진행 중'}
            onClick={() => setSelectedTab('진행 중')}
          >
            진행 중
          </BlackFilter>
          <BlackFilter
            isSelected={selectedTab === '종료 임박'}
            onClick={() => setSelectedTab('종료 임박')}
          >
            종료 임박
          </BlackFilter>
          <BlackFilter isSelected={selectedTab === '종료'} onClick={() => setSelectedTab('종료')}>
            종료
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
          <QuestionListWrapper>
            <EmptyStateWrapper>
              <EmptyState
                icon='comment'
                title='아직 이 중에 뭐 살까 글이 없어요'
                subtitle='궁금한 것을 물어보며
다양한 의견을 받아보아요.'
              ></EmptyState>
            </EmptyStateWrapper>
          </QuestionListWrapper>
        )}

        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default BuyHome
