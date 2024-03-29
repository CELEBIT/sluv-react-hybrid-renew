import React, { useEffect, useState } from 'react'
import { SearchResultPageStyle } from './styles'
import Header from '../../components/Header/Header'
import SearchBarContainer from './components/SearchBarContainer'
import styled from '@emotion/styled'
import Tabs from '../../components/Tabs'
import { useLocation, useNavigate } from 'react-router-dom'
import { queryToObject } from '../../utils/utility'
import SearchResultContainer from './components/SearchResultContainer'

const SearchResult = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchKeyword = queryToObject(search)

  const [keyword, setKeyword] = useState(searchKeyword.keyword)
  const [selectedTab, setSelectedTab] = useState('all')

  const tabList = [
    { id: 'all', tabName: '통합' },
    { id: 'item', tabName: '아이템' },
    { id: 'community', tabName: '커뮤니티' },
    { id: 'user', tabName: '사용자' },
  ]

  return (
    <SearchResultPageStyle>
      <HeaderWrap>
        <Header
          isModalHeader={false}
          title={'검색 결과'}
          hasArrow={true}
          backBtnClick={() => navigate(-1)}
        />
      </HeaderWrap>
      <SearchBarWrap>
        <SearchBarContainer keyword={keyword} setKeyword={setKeyword} />
      </SearchBarWrap>
      <Tabs tabList={tabList} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <SearchResultContainer selectedTab={selectedTab} keyword={searchKeyword.keyword} />
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
