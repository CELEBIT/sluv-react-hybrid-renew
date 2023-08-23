import React, { useEffect, useState } from 'react'
import { WaitResult } from '../../apis/question/questionService.type'
import {
  Category,
  DetailInfo,
  DetailLeft,
  DetailRight,
  EachVotePhoto,
  InfoTop,
  Recommend,
  RecommendContainer,
  RecommendInfo,
  RecommendPhoto,
  RecommendVote,
} from '../../pages/community/detail/styles'
import { useNavigate } from 'react-router-dom'
import { SearchQuestionResult } from '../../apis/search/searchService'
import UserImage from '../UserImage/UserImage'

interface QuestionItemProps {
  item: WaitResult | SearchQuestionResult
  detail?: boolean
}

const QuestionListItem = ({ item, detail }: QuestionItemProps) => {
  const navigate = useNavigate()
  const [color, setColor] = useState<string>('')
  const [questionType, setQuestionType] = useState<string>('')

  useEffect(() => {
    if (item.qtype === 'Recommend') {
      setQuestionType('추천해 줘')
      setColor('blue')
    } else if (item.qtype === 'Howabout') {
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
  const sortedList = combinedList.sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <RecommendContainer
      detail={detail}
      key={item.id}
      onClick={() => navigate(`/community/detail/${item.id}`)}
    >
      <Recommend>
        <RecommendInfo>
          <InfoTop>
            <Category color={color}>{questionType}</Category>
            {item.celebName && <Category color='grey'>{item.celebName}</Category>}
            {item.categoryName && (
              <>
                {item.categoryName.map((category) => {
                  return (
                    <Category color='grey' key={category}>
                      {category}
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
      {detail && (
        <DetailInfo>
          <DetailLeft>
            <UserImage size={20}></UserImage>
          </DetailLeft>
          <DetailRight></DetailRight>
        </DetailInfo>
      )}
    </RecommendContainer>
  )
}

export default QuestionListItem
