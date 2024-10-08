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
import { ReactComponent as HowAboutBanner } from '../../../../assets/CommunityEachBanner/HowAboutBanner.svg'
import EmptyState from '../../../../components/EmptyState'
import ButtonSmall from '../../../../components/ButtonSmall/ButtonSmall'
import { useNavigate } from 'react-router-dom'
import Flex from '../../../../components/Flex'
import { ReactComponent as ConnectionError } from '../../../../assets/connectionError_36.svg'

const HowAboutHome = () => {
  const navigate = useNavigate()
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)

  const { getQuestionHowAboutList } = useQuestionListQuery()
  const { data, status } = getQuestionHowAboutList()
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
          title={isStickyAtTop ? '이거 어때' : ''}
          hasArrow={true}
        ></Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <HowAboutBanner
          style={{
            flexShrink: 0,
            width: '100vw',
            height: 'auto',
          }}
        ></HowAboutBanner>
        <QuestionListWrapper>
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
                <>
                  {tempData?.map((each, index) => {
                    return (
                      <>
                        <QuestionListItem
                          key={each.id}
                          item={each}
                          detail={true}
                        ></QuestionListItem>
                        {index !== tempData.length - 1 && <Line></Line>}
                      </>
                    )
                  })}
                </>
              ) : (
                <EmptyStateContainer>
                  <EmptyState
                    icon='comment'
                    title='‘이거 어때’ 게시글이 없어요'
                    subtitle='궁금한 것을 물어보며
다양한 의견을 받아 보아요'
                  >
                    <ButtonSmall
                      text='질문하러 가기'
                      type='pri'
                      onClick={() => navigate('/community/create/howabout')}
                    />
                  </EmptyState>
                </EmptyStateContainer>
              )}
            </>
          )}
        </QuestionListWrapper>
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default HowAboutHome
