import React, { useRef } from 'react'
import ItemListGrid from '../../../components/ItemListGrid/ItemListGrid'
import useItemSearchQuery from '../../../apis/search/hooks/useItemSearchQuery'
import useSearchQuery from '../../../apis/search/hooks/useSearchQuery'
import Flex from '../../../components/Flex'
import QuestionListItem from '../../../components/QuestionListItem/QuestionListItem'
import { Line } from '../../community/detail/styles'
import { ReactComponent as Spinner } from '../../../assets/Spinner.svg'
import { useObserver } from '../../../hooks/useObserver'
import EmptyState from '../../../components/EmptyState'
import { Divider } from '../../item/detail/styles'

type Props = {
  keyword: string
}

const CommunityResult = ({ keyword }: Props) => {
  const { searchCommunity } = useSearchQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } =
    searchCommunity(keyword)
  console.log(data)
  const bottom = useRef(null)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })
  return (
    <div>
      {status === 'error' && (
        <Flex justify='center' align='center'>
          {JSON.stringify(error.response.data)}
        </Flex>
      )}
      {status === 'success' && data && data.pages[0].content.length > 0 ? (
        data?.pages.map((list) =>
          list.content.map((each) => {
            return (
              <>
                <QuestionListItem key={each.id} item={each} detail={true}></QuestionListItem>
                <Line></Line>
              </>
            )
          }),
        )
      ) : (
        <>
          <EmptyState
            icon='search'
            title='커뮤니티 검색 결과가 없어요'
            subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
          ></EmptyState>
          <Divider></Divider>
        </>
      )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <Flex justify='center' align='center' className='spinner'>
          <Spinner></Spinner>
        </Flex>
      ) : null}
    </div>
  )
}

export default CommunityResult
