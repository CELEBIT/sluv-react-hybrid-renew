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
import { WaitResult } from '../../../../apis/question/questionService.type'
import { useNavigate } from 'react-router-dom'

interface RecommendListProps {
  questionId: number
  nickName: string | undefined
  qType: string
}

const RecommendList = ({ questionId, nickName, qType }: RecommendListProps) => {
  const navigate = useNavigate()

  const [questionType, setQuestionType] = useState<string>('')
  const [color, setColor] = useState<string>('')

  const { getWaitQuestion } = useQuestionDetailQuery()
  const { data } = getWaitQuestion(Number(questionId), qType)
  console.log('Wait Data', data)

  console.log(qType)
  console.log('RecommendList Data', data)
  useEffect(() => {
    if (qType === 'Recommend') {
      setQuestionType('추천해 줘')
      setColor('blue')
    } else if (qType === 'How') {
      setQuestionType('이거 어때')
      setColor('yellow')
    } else if (qType === 'Find') {
      setQuestionType('찾아주세요')
      setColor('pink')
    } else {
      setQuestionType('이 중에 뭐 살까')
      setColor('green')
    }
  })

  return (
    <RecommendListWrapper>
      {(data?.length ?? 0) > 0 && (
        <span className='title'>{nickName} 님의 추천을 기다리고 있어요</span>
      )}
      {data &&
        data.map((each, index) => {
          const combinedList = [
            ...(each?.imgList?.filter((item) => item !== null) ?? []),
            ...(each?.itemImgList?.filter((item) => item !== null) ?? []),
          ]
          console.log(combinedList)
          const sortedList = combinedList.sort((a, b) => a.sortOrder - b.sortOrder)
          console.log('sortedList', sortedList)
          return (
            <>
              <Recommend key={each.id} onClick={() => navigate(`/community/detail/${each.id}`)}>
                <RecommendInfo>
                  <InfoTop>
                    <Category color={color}>{questionType}</Category>
                    {each.celebName && <Category color='grey'>{each.celebName}</Category>}
                    {each.categoryName && <Category color='grey'>{questionType}</Category>}
                  </InfoTop>
                  <span className='questionTitle'>{each.content}</span>
                </RecommendInfo>
                {qType !== 'Buy' ? (
                  <>
                    {Array.isArray(each.itemImgList) &&
                      each.itemImgList.length > 0 &&
                      each.itemImgList[0] !== null && (
                        <RecommendPhoto imgUrl={each.itemImgList[0].imgUrl}></RecommendPhoto>
                      )}
                    {Array.isArray(each.imgList) &&
                      each.imgList.length > 0 &&
                      each.imgList[0] !== null && (
                        <RecommendPhoto imgUrl={each.imgList[0].imgUrl}></RecommendPhoto>
                      )}
                  </>
                ) : (
                  <>
                    {Array.isArray(sortedList) &&
                      (sortedList?.length ?? 0) > 0 &&
                      sortedList[0] !== null && (
                        <RecommendVote>
                          {sortedList.map((vote) => {
                            return (
                              <EachVotePhoto
                                key={vote.sortOrder}
                                imgUrl={vote.imgUrl ?? ''}
                              ></EachVotePhoto>
                            )
                          })}
                        </RecommendVote>
                      )}
                  </>
                )}
              </Recommend>
              {index !== data.length - 1 && <Line></Line>}
            </>
          )
        })}
    </RecommendListWrapper>
  )
}

export default RecommendList
