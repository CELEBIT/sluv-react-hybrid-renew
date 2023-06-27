import React, { useEffect, useState } from 'react'
import { WaitResult } from '../../apis/question/questionService.type'
import {
  Category,
  EachVotePhoto,
  InfoTop,
  Recommend,
  RecommendInfo,
  RecommendPhoto,
  RecommendVote,
} from '../../pages/community/detail/styles'
import { useNavigate } from 'react-router-dom'
import { SearchQuestionResult } from '../../apis/search/searchService'

interface QuestionItemProps {
  item: WaitResult | SearchQuestionResult
}

const QuestionListItem = ({ item }: QuestionItemProps) => {
  const navigate = useNavigate()
  const [color, setColor] = useState<string>('')
  const [questionType, setQuestionType] = useState<string>('')
  console.log('item', item)
  useEffect(() => {
    if (item.qtype === 'Recommend') {
      setQuestionType('추천해 줘')
      setColor('blue')
    } else if (item.qtype === 'How') {
      setQuestionType('이거 어때')
      setColor('yellow')
    } else if (item.qtype === 'Find') {
      setQuestionType('찾아주세요')
      setColor('pink')
    } else {
      setQuestionType('이 중에 뭐 살까')
      setColor('green')
    }
  }, [item])

  const combinedList = [
    ...(item?.imgList?.filter((item) => item !== null) ?? []),
    ...(item?.itemImgList?.filter((item) => item !== null) ?? []),
  ]
  console.log(combinedList)
  const sortedList = combinedList.sort((a, b) => a.sortOrder - b.sortOrder)
  console.log('sortedList', sortedList)
  return (
    <>
      <Recommend key={item.id} onClick={() => navigate(`/community/detail/${item.id}`)}>
        <RecommendInfo>
          <InfoTop>
            <Category color={color}>{questionType}</Category>
            {item.celebName && <Category color='grey'>{item.celebName}</Category>}
            {item.categoryName && (
              <>
                {item.categoryName.map((category) => {
                  return (
                    <Category color='grey' key={category}>
                      {item.categoryName}
                    </Category>
                  )
                })}
              </>
            )}
          </InfoTop>
          <span className='questionTitle'>{item.title}</span>
        </RecommendInfo>

        {item.qtype !== 'Buy' ? (
          <>
            {Array.isArray(item.itemImgList) &&
              item.itemImgList.length > 0 &&
              item.itemImgList[0] !== null && (
                <RecommendPhoto imgUrl={item.itemImgList[0].imgUrl}></RecommendPhoto>
              )}
            {Array.isArray(item.imgList) && item.imgList.length > 0 && item.imgList[0] !== null && (
              <RecommendPhoto imgUrl={item.imgList[0].imgUrl}></RecommendPhoto>
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
    </>
  )
}

export default QuestionListItem
