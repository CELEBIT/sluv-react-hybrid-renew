import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityPageContainer, QuestionListWrapper, TabContainer } from './styles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as NoticeOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as NoticeOff } from '../../assets/bell_off_24.svg'
import useQuestionListQuery from '../../apis/question/hooks/useQuestionListQuery'
import WriteCommunityItemButton from './components/WriteCommunityItemButton/WriteCommunityItemButton'
import BannerItemsList from './components/BannerItems/BannerItemsList'
import Menu, { EachMenu, MenuContainer, MenuText } from './components/Menu/Menu'
import QuestionListItem from '../../components/QuestionListItem/QuestionListItem'
import { Line } from './detail/styles'
import { ComponentContainer } from '../home/styles'
import BlackFilter from '../../components/FIlter/BlackFilter'
import { useObserver } from '../../hooks/useObserver'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { GetPaginationResult } from '../../apis/core/type'
import { SearchQuestionResult } from '../../apis/search/searchService'

const Community = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('Hot')
  let tempData,
    isfetching,
    isfetchingNextPage,
    fetchnextPage: (
      options?: FetchNextPageOptions | undefined,
    ) => Promise<InfiniteQueryObserverResult<GetPaginationResult<SearchQuestionResult>, any>>

  if (selectedTab === 'Hot') {
    const { getQuestionHotList } = useQuestionListQuery()
    const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
      getQuestionHotList()
    tempData = data?.pages[0].content
    isfetching = isFetching
    isfetchingNextPage = isFetchingNextPage
    fetchnextPage = fetchNextPage
  } else {
    const { getQuestionTotalList } = useQuestionListQuery()
    const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
      getQuestionTotalList()
    console.log('getQuestionTotalList', data)
    tempData = data?.pages[0].content
    isfetching = isFetching
    isfetchingNextPage = isFetchingNextPage
    fetchnextPage = fetchNextPage
  }

  const bottom = useRef(null)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchnextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })
  // const tempData = data?.pages[0].content
  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
        setIsStickyAtTop(top <= 65)
      }
    }
    ComponentContainerRef.current?.addEventListener('scroll', handleScroll)
    return () => {
      ComponentContainerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <CommunityPageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} title='커뮤니티' hasArrow={false}>
          <Search fill='black' onClick={() => navigate('/search')}></Search>
          <NoticeOff></NoticeOff>
        </Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <BannerItemsList></BannerItemsList>
        <Menu menuRef={stickyRef} isStickyAtTop={isStickyAtTop}></Menu>
        <TabContainer>
          <BlackFilter isSelected={selectedTab === 'Hot'} onClick={() => setSelectedTab('Hot')}>
            Hot
          </BlackFilter>
          <BlackFilter isSelected={selectedTab === 'New'} onClick={() => setSelectedTab('New')}>
            New
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
          <div ref={bottom} />
          {isfetching && !isfetchingNextPage ? (
            <div className='spinner'>
              <div>Loading</div>
            </div>
          ) : null}
        </QuestionListWrapper>
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default Community
