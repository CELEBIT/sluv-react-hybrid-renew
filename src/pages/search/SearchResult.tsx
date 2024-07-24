import React, { useEffect, useRef, useState } from 'react'
import { SearchResultPageStyle } from './styles'
import Header from '../../components/Header/Header'
import SearchBarContainer from './components/SearchBarContainer'
import styled from '@emotion/styled'
import Tabs from '../../components/Tabs'
import { useLocation, useNavigate } from 'react-router-dom'
import { queryToObject } from '../../utils/utility'
import SearchResultContainer from './components/SearchResultContainer'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { atomKeys } from '../../config/atomKeys'

export const searchTabState = atom<string>({
  key: atomKeys.searchTab,
  default: 'all',
})

const SearchResult = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchKeyword = queryToObject(search)

  const [keyword, setKeyword] = useState(searchKeyword.keyword)
  const [currentTab, setCurrentTab] = useRecoilState(searchTabState)
  const resetCurrentTab = useResetRecoilState(searchTabState)
  const tabList = [
    { id: 'all', tabName: '통합' },
    { id: 'item', tabName: '아이템' },
    { id: 'community', tabName: '커뮤니티' },
    { id: 'user', tabName: '사용자' },
  ]

  const onBackClick = () => {
    resetCurrentTab()
    navigate(-1)
  }
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(scrollToTopRef.current?.scrollTop)
    scrollToTopRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [currentTab])

  return (
    <SearchResultPageStyle>
      <HeaderWrap>
        <Header
          isModalHeader={false}
          title={'검색 결과'}
          hasArrow={true}
          backBtnClick={onBackClick}
        />
      </HeaderWrap>
      <ScrollContainer ref={scrollToTopRef}>
        <SearchBarWrap>
          <SearchBarContainer keyword={keyword} setKeyword={setKeyword} />
        </SearchBarWrap>
        <Tabs tabList={tabList} selectedTab={currentTab} setSelectedTab={setCurrentTab} />
        <SearchResultContainer selectedTab={currentTab} keyword={searchKeyword.keyword} />
      </ScrollContainer>
    </SearchResultPageStyle>
  )
}

export default SearchResult

const SearchBarWrap = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.62rem;
  padding: 0 1.25rem;
`
const HeaderWrap = styled.div`
  padding: 0 1.25rem;
`
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
`
