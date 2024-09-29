import React from 'react'
import styled from '@emotion/styled'
import { Common } from '../styles'

interface HighlightedTextProps {
  searchText: string
  text: string
  fontSize?: number
  fontWeight?: number
  disabled?: boolean
}

const HighlightedText = ({
  searchText,
  text,
  fontSize,
  fontWeight,
  disabled,
}: HighlightedTextProps) => {
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
          <span key={i} className={disabled ? 'disabled' : undefined}>
            {part}
          </span>
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

  .disabled {
    color: ${Common.colors.GR500} !important;
  }
`
export default HighlightedText
