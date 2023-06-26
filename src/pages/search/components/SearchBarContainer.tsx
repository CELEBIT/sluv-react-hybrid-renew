import styled from '@emotion/styled'
import React, { useState } from 'react'
import SearchTextfield from '../../../components/TextField/SearchTextfield/SearchTextfield'

interface SearchBarContainerProps {
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchBarContainer = ({ keyword, setKeyword }: SearchBarContainerProps) => {
  return (
    <SearchBarWrap>
      <SearchTextfield
        value={keyword}
        setValue={setKeyword}
        onEnter={() => console.log('Enter')}
        placeholder='셀럽의 아이템을 검색해 보세요'
      />
    </SearchBarWrap>
  )
}

export default SearchBarContainer

const SearchBarWrap = styled.div`
  padding: 0 1.25rem;
`
