import React from 'react'
import styled from '@emotion/styled'
import { Common } from '../styles'

interface HighlightedTextProps {
  searchText: string
  text: string
}

const HighlightedText = ({ searchText, text }: HighlightedTextProps) => {
  const regex = new RegExp(`(${searchText})`, 'gi')
  const parts = text.split(regex)

  return (
    <div>
      {parts.map((part, i) =>
        regex.test(part) ? <Highlight key={i}>{part}</Highlight> : <span key={i}>{part}</span>,
      )}
    </div>
  )
}

const Highlight = styled.span`
  color: ${Common.colors.SEC} !important;
`

export default HighlightedText
