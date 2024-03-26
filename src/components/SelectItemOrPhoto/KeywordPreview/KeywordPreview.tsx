import styled from '@emotion/styled'
import React, { useRef } from 'react'
import useSearchPreviewQuery from '../../../apis/search/hooks/useSearchPreviewQuery'
import { useObserver } from '../../../hooks/useObserver'
import HighlightedText from '../../../components/HighlightedText/HighlightedText'
import { useDebounce } from 'use-debounce'
import { Common, Pretendard } from '../../../components/styles'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'

interface KeywordPreviewProps {
  keyword: string
}

const KeywordPreview = ({ keyword }: KeywordPreviewProps) => {
  const navigate = useNavigate()

  const bottom = useRef(null)
  const [debouncedKeyword] = useDebounce(keyword, 300)

  const { getSearchKeywordPreview } = useSearchPreviewQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } =
    getSearchKeywordPreview(keyword)

  console.log(data)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  const onClickPreviewKeyword = (keyword: string) => {
    navigate(`/search/result?keyword=${keyword}`)
  }

  return (
    <KeywordPreviewWrap>
      {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
      {status === 'success' &&
        data?.pages.map(
          (item) =>
            item.content.length > 0 &&
            item.content.map((item, idx) => {
              return (
                <KeywordItem key={idx} onClick={() => onClickPreviewKeyword(item.keyword)}>
                  <HighlightedText searchText={debouncedKeyword} text={item.keyword} />
                </KeywordItem>
              )
            }),
        )}

      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <div className='spinner'>
          <Loading />
        </div>
      ) : null}
    </KeywordPreviewWrap>
  )
}

export default KeywordPreview

const KeywordPreviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`
const KeywordItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`
