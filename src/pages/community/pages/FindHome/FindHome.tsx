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

const FindHome = () => {
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string>('전체')

  const { getQuestionFindList } = useQuestionListQuery()
  const { data } = getQuestionFindList()
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
        <FindHomeBanner></FindHomeBanner>
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

export default FindHome
