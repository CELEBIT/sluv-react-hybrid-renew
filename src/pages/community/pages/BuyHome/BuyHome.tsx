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
import WriteCommunityItemButton from '../../components/WriteCommunityItemButton/WriteCommunityItemButton'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import { Line } from '../../detail/styles'
import { ReactComponent as BuyHomeBanner } from '../../../../assets/CommunityEachBanner/BuyBanner.svg'
import { ReactComponent as ConnectionError } from '../../../../assets/connectionError_36.svg'
import EmptyState from '../../../../components/EmptyState'
import BuyVote from './components/BuyVote'
import ButtonSmall from '../../../../components/ButtonSmall/ButtonSmall'
import { useNavigate } from 'react-router-dom'
import Flex from '../../../../components/Flex'
import { url } from 'inspector'

const BuyHome = () => {
  const navigate = useNavigate()
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string>('전체')

  const { getQuestionBuyList } = useQuestionListQuery()
  const { data, status } = getQuestionBuyList(selectedTab)
  const tempData = data?.pages[0].content

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
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
        <BuyHomeBanner
          style={{
            flexShrink: 0,
            width: '100vw',
            height: 'auto',
          }}
        ></BuyHomeBanner>
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
        {status === 'error' ? (
          <Flex
            justify='center'
            align='center'
            direction='column'
            style={{ height: '40vh', gap: '0.5rem' }}
          >
            <ConnectionError></ConnectionError>
            <span>죄송해요. 잠시 문제가 생긴 것 같아요.</span>
            <span>잠시만 기다려주세요.</span>
          </Flex>
        ) : (
          <>
            {(tempData?.length ?? 0) > 0 ? (
              <QuestionListWrapper>
                {tempData?.map((each, index) => {
                  return (
                    <>
                      <BuyVote item={each} selectedTab={selectedTab} key={index}></BuyVote>
                      {index !== tempData.length - 1 && <Line></Line>}
                    </>
                  )
                })}
              </QuestionListWrapper>
            ) : (
              // <QuestionListWrapper>
              <EmptyStateContainer>
                <EmptyState
                  icon='comment'
                  title='‘이 중에 뭐 살까’ 게시글이 없어요'
                  subtitle='고민되는 아이템을 질문해 보아요'
                >
                  <ButtonSmall
                    text='질문하러 가기'
                    type='pri'
                    onClick={() => navigate('/community/create/buy')}
                  />
                </EmptyState>
              </EmptyStateContainer>
              // </QuestionListWrapper>
            )}
          </>
        )}

        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default BuyHome
