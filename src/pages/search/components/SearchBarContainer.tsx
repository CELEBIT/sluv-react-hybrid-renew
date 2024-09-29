import styled from '@emotion/styled'
import React, { useState } from 'react'
import SearchTextfield from '../../../components/TextField/SearchTextfield/SearchTextfield'
import { useNavigate } from 'react-router-dom'

interface SearchBarContainerProps {
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchBarContainer = ({ keyword, setKeyword }: SearchBarContainerProps) => {
  const navigate = useNavigate()
  const onEnterSearch = () => {
    navigate(`/search/result?keyword=${keyword}`)
  }

  return (
    <SearchTextfield
      value={keyword}
      setValue={setKeyword}
      onEnter={onEnterSearch}
      placeholder='셀럽의 아이템을 검색해 보세요'
    />
  )
}

export default SearchBarContainer
