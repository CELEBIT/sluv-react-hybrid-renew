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
import { ReactComponent as FindHomeBanner } from '../../../../assets/CommunityEachBanner/FindBanner.svg'
import EmptyState from '../../../../components/EmptyState'
import useInterestCelebQuery from '../../../../apis/user/hooks/useInterestCelebQuery'

const FindHome = () => {
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const { getInterestCeleb } = useInterestCelebQuery()
  const celebList = getInterestCeleb
  console.log('celebList', celebList.data)

  const { getQuestionFindList } = useQuestionListQuery()
  const { data } = getQuestionFindList(selectedTab ? selectedTab : undefined)
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
          title={isStickyAtTop ? '찾아주세요' : ''}
          hasArrow={true}
        ></Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <FindHomeBanner style={{ flexShrink: 0 }}></FindHomeBanner>
        <TabContainer ref={stickyRef}>
          <BlackFilter isSelected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
            전체
          </BlackFilter>
          {celebList.data?.map((celeb) => {
            return (
              <BlackFilter
                key={celeb.id}
                isSelected={selectedTab === celeb.id}
                onClick={() => setSelectedTab(celeb.id)}
              >
                {celeb.celebNameKr}
              </BlackFilter>
            )
          })}
        </TabContainer>
        <QuestionListWrapper>
          {(tempData?.length ?? 0) > 0 ? (
            <>
              {tempData?.map((each, index) => {
                return (
                  <>
                    <QuestionListItem key={each.id} item={each} detail={true}></QuestionListItem>
                    {index !== tempData.length - 1 && <Line></Line>}
                  </>
                )
              })}
            </>
          ) : (
            <EmptyState
              icon='comment'
              title='아직 찾아주세요 글이 없어요'
              subtitle='궁금한 것을 물어보며
다양한 의견을 받아보아요.'
            ></EmptyState>
          )}
        </QuestionListWrapper>
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default FindHome
