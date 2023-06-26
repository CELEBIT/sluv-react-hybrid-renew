import React, { useState } from 'react'
import { HeaderWrap, SearchPageStyle } from './styles'
import Header from '../../components/Header/Header'
import SearchTextfield from '../../components/TextField/SearchTextfield/SearchTextfield'
import SearchBarContainer from './components/SearchBarContainer'
import useRecentSearchQuery from '../../apis/search/hooks/useRecentSearchQuery'
import RecentSearchContainer from './components/RecentSearchContainer'
import KeywordPreviewContainer from './components/KeywordPreviewContainer'

const Search = () => {
  const [keyword, setKeyword] = useState('')

  const {
    getRecentSearch: { data },
  } = useRecentSearchQuery()

  return (
    <SearchPageStyle>
      <HeaderWrap>
        <Header isModalHeader={false} title={'전체 검색'} hasArrow={true} />
      </HeaderWrap>
      <SearchBarContainer keyword={keyword} setKeyword={setKeyword} />
      {!keyword ? (
        <>{(data?.length ?? 0) > 0 && <RecentSearchContainer dataList={data} />}</>
      ) : (
        <KeywordPreviewContainer keyword={keyword} />
      )}
    </SearchPageStyle>
  )
}

export default Search
