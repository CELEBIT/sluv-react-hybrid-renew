import e from 'express'
import React, { useEffect, useState } from 'react'
import useQuestionDetailQuery from '../../../../apis/question/hooks/useQuestionDetailQuery'
import {
  Category,
  EachVotePhoto,
  InfoTop,
  Line,
  Recommend,
  RecommendInfo,
  RecommendListWrapper,
  RecommendPhoto,
  RecommendVote,
} from '../styles'
import QuestionListItem from '../../../../components/QuestionListItem/QuestionListItem'

interface RecommendListProps {
  questionId: number
  nickName: string | undefined
  qType: string
}

const RecommendList = ({ questionId, nickName, qType }: RecommendListProps) => {
  const { getWaitQuestion } = useQuestionDetailQuery()
  const { data } = getWaitQuestion(Number(questionId), qType)
  return (
    <RecommendListWrapper>
      {(data?.length ?? 0) > 0 && (
        <>
          {qType === 'Find' ? (
            <span className='title'>아이템 정보를 기다리고 있어요</span>
          ) : (
            <>
              {qType === 'Buy' ? (
                <span className='title'>{nickName} 님의 투표를 기다리고 있어요</span>
              ) : (
                <>
                  {qType === 'How' ? (
                    <span className='title'>{nickName} 님의 답변을 기다리고 있어요</span>
                  ) : (
                    <span className='title'>{nickName} 님의 추천을 기다리고 있어요</span>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      {data &&
        data.map((each, index) => {
          return (
            <>
              <QuestionListItem item={each}></QuestionListItem>
              {index !== data.length - 1 && <Line></Line>}
            </>
          )
        })}
    </RecommendListWrapper>
  )
}

export default RecommendList
