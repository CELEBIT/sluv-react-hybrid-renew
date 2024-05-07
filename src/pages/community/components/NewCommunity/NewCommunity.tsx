import React, { useRef } from 'react'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'
import { useObserver } from '../../../../hooks/useObserver'
import { Line } from '../../detail/styles'
import Flex from '../../../../components/Flex'
import { ReactComponent as Spinner } from '../../../../assets/Spinner.svg'
import { ReactComponent as ConnectionError } from '../../../../assets/connectionError_36.svg'
import styled from '@emotion/styled'

function NewCommunity() {
  const { getQuestionTotalList } = useQuestionListQuery()
  const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
    getQuestionTotalList()
  const bottom = useRef(null)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })
  return (
    <Layout>
      {status === 'error' && (
        <Flex
          justify='center'
          align='center'
          direction='column'
          style={{ height: '40vh', gap: '0.5rem' }}
        >
          <ConnectionError></ConnectionError>
          <span>죄송해요. 잠시 문제가 생긴 것 같아요.</span>
          <span>잠시만 기다려주세요.</span>
        </Flex>
      )}
      {status === 'success' &&
        data?.pages.map((list) =>
          list.content.map((each) => {
            return (
              <div key={each.id + each.title} style={{ display: 'flex', flexDirection: 'column' }}>
                <QuestionListItem
                  key={each.id + each.title}
                  item={each}
                  detail={true}
                ></QuestionListItem>
                <Line></Line>
              </div>
            )
          }),
        )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <Flex justify='center' align='center' className='spinner' style={{ height: '40vh' }}>
          <Spinner></Spinner>
        </Flex>
      ) : null}
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5.625rem;
`

export default NewCommunity
