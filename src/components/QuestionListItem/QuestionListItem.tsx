import React, { useEffect, useState } from 'react'
import {
  Category,
  DetailEach,
  DetailInfo,
  DetailLeft,
  DetailNickname,
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
import { ReactComponent as Like } from '../../assets/Like_18.svg'
import { ReactComponent as CommentIcon } from '../../assets/comment_18.svg'
import { ReactComponent as View } from '../../assets/page view_18.svg'

interface QuestionItemProps {
  item: SearchQuestionResult
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
          <span className='questionTitle'>
            {item.title}
            {item.content}
          </span>
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
            <UserImage size={20} imgUrl={item.user?.profileImgUrl}></UserImage>
            <DetailNickname>{item.user?.nickName}</DetailNickname>
          </DetailLeft>
          <DetailRight>
            <DetailEach>
              <Like></Like>
              {item.likeNum}
            </DetailEach>
            <DetailEach>
              <CommentIcon></CommentIcon>
              {item.commentNum}
            </DetailEach>

            <DetailEach>
              <View></View>
              {item.viewNum}
            </DetailEach>
          </DetailRight>
        </DetailInfo>
      )}
    </RecommendContainer>
  )
}

export default QuestionListItem
