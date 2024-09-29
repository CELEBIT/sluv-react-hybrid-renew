import styled from '@emotion/styled'
import React from 'react'
import { SearchedHashTag } from './styles'
import HighlightedText from '../../../../../components/HighlightedText/HighlightedText'
import useItemHashtagQuery from '../../../../../apis/item/hooks/useItemHashtagQuery'
import { useDebounce } from 'use-debounce'
import { IHashTag } from '../../../../../recoil/itemInfo'

interface HashTagSearchListProps {
  name: string
  onClickHashTag: (tag: IHashTag) => void
}

const HashTagSearchList = ({ name, onClickHashTag }: HashTagSearchListProps) => {
  const { searchHashtag } = useItemHashtagQuery()
  const [debounceName] = useDebounce(name, 300)
  const { data } = searchHashtag(debounceName)

  return (
    <Wrapper>
      {data?.map((hashtag) => {
        return (
          <SearchedHashTag key={hashtag.hashtagId} onClick={() => onClickHashTag(hashtag)}>
            <span className='symbol'>#</span>
            <HighlightedText searchText={debounceName} text={hashtag.hashtagContent} />
            <span className='count'>{hashtag.count}</span>
          </SearchedHashTag>
        )
      })}
    </Wrapper>
  )
}

export default HashTagSearchList

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 0 1.25rem;
  ::-webkit-scrollbar {
    display: none;
  }
`
