import styled from '@emotion/styled'
import React from 'react'
import TotalResultContainer from './TotalResultContainer'

interface SearchResultContainerProps {
  selectedTab: string
  keyword: string
}

const SearchResultContainer = ({ selectedTab, keyword }: SearchResultContainerProps) => {
  return (
    <SearchResultWrap>
      {selectedTab === 'all' && <TotalResultContainer keyword={keyword} />}
    </SearchResultWrap>
  )
}

export default SearchResultContainer

const SearchResultWrap = styled.div`
  padding-top: 1rem;
`
