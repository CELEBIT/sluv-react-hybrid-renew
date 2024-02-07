import React, { useRef } from 'react'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import { useObserver } from '../../../../hooks/useObserver'
import { Line } from '../../detail/styles'
import { ReactComponent as Spinner } from '../../../../assets/Spinner.svg'
import Flex from '../../../../components/Flex'

function HotCommunity() {
  const { getQuestionHotList } = useQuestionListQuery()
  const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
    getQuestionHotList()
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
      {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
      {status === 'success' &&
        data?.pages.map((list) =>
          list.content.map((each) => {
            return (
              <>
                <QuestionListItem key={each.id} item={each} detail={true}></QuestionListItem>
                <Line></Line>
              </>
            )
          }),
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

export default HotCommunity
