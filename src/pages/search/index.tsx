import React, { useState } from 'react'
import { HeaderWrap, SearchPageStyle } from './styles'
import Header from '../../components/Header/Header'
import SearchTextfield from '../../components/TextField/SearchTextfield/SearchTextfield'
import SearchBarContainer from './components/SearchBarContainer'
import useRecentSearchQuery from '../../apis/search/hooks/useRecentSearchQuery'
import RecentSearchContainer from './components/RecentSearchContainer'
import KeywordPreviewContainer from './components/KeywordPreviewContainer'
import styled from '@emotion/styled'
import RankContainer from './components/RankContainer'
import RecentItemContainer from './components/RecentItemContainer'
import useRecentViewItemQuery from '../../apis/item/hooks/useRecentViewItemQuery'

const Search = () => {
  const [keyword, setKeyword] = useState('')

  const {
    getRecentSearch: { data: recentSearchData },
  } = useRecentSearchQuery()

  const { getRecentViewItem } = useRecentViewItemQuery()
  const { data: recentViewData } = getRecentViewItem()

  return (
    <SearchPageStyle>
      <HeaderWrap>
        <Header isModalHeader={false} title={'전체 검색'} hasArrow={true} />
      </HeaderWrap>
      <SearchBarWrap>
        <SearchBarContainer keyword={keyword} setKeyword={setKeyword} />
      </SearchBarWrap>
      {!keyword ? (
        <>
          {(recentSearchData?.length ?? 0) > 0 && (
            <RecentSearchContainer dataList={recentSearchData} />
          )}
          <RankContainer />
          {(recentViewData?.pages[0].content.length ?? 0) > 0 && (
            <RecentItemContainer dataList={recentViewData?.pages[0].content} />
          )}
        </>
      ) : (
        <KeywordPreviewContainer keyword={keyword} />
      )}
    </SearchPageStyle>
  )
}

export default Search

const SearchBarWrap = styled.div`
  padding: 0 1.25rem;
`
