import React from 'react'
import styled from '@emotion/styled'
import { Common } from '../styles'

interface HighlightedTextProps {
  searchText: string
  text: string
  fontSize?: number
  fontWeight?: number
}

const HighlightedText = ({ searchText, text, fontSize, fontWeight }: HighlightedTextProps) => {
  const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedSearchText})`, 'gi')
  const parts = text.split(regex)

  return (
    <HighlightWrapper fontSize={fontSize} fontWeight={fontWeight}>
      {parts.map((part, i) =>
        searchText && regex.test(part) ? (
          <span className='highlighted' key={i}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </HighlightWrapper>
  )
}
const HighlightWrapper = styled.div<{ fontSize?: number; fontWeight?: number }>`
  font-family: 'Pretendard';
  font-size: ${(props) => props.fontSize}rem;
  font-weight: ${(props) => props.fontWeight};

  .highlighted {
    color: ${Common.colors.SEC} !important;
  }
`
export default HighlightedText
