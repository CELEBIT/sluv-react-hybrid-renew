import styled from '@emotion/styled'
import React from 'react'
import TotalResult from './TotalResult'
import ItemResult from './ItemResult'
import CommunityResult from './CommunityResult'
import UserResult from './UserResult'

interface SearchResultContainerProps {
  selectedTab: string
  keyword: string
}

const SearchResultContainer = ({ selectedTab, keyword }: SearchResultContainerProps) => {
  return (
    <SearchResultWrap>
      {selectedTab === 'all' && <TotalResult keyword={keyword} />}
      {selectedTab === 'item' && <ItemResult keyword={keyword} />}
      {selectedTab === 'community' && <CommunityResult keyword={keyword} />}
      {selectedTab === 'user' && <UserResult keyword={keyword} />}
    </SearchResultWrap>
  )
}

export default SearchResultContainer

const SearchResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 0.75rem;
`
