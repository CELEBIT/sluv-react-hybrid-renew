import React, { useRef } from 'react'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import { useObserver } from '../../../../hooks/useObserver'
import { Line } from '../../detail/styles'
import Flex from '../../../../components/Flex'
import { ReactComponent as Spinner } from '../../../../assets/Spinner.svg'

function NewCommunity() {
  const { getQuestionTotalList } = useQuestionListQuery()
  const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
    getQuestionTotalList()
  console.log(status, 'status')
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

export default NewCommunity