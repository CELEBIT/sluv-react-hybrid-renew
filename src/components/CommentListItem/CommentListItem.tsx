import React from 'react'
import { InfoTop, Recommend, RecommendInfo } from '../../pages/community/detail/styles'
import { Category } from '../../pages/item/detail/styles'
import { useNavigate } from 'react-router-dom'
import { ICommentResult } from '../../apis/user/userService'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

interface CommentListItemProps {
  comment: ICommentResult
}

const CommentListItem = ({ comment }: CommentListItemProps) => {
  const navigate = useNavigate()
  return (
    <Recommend key={comment.id} onClick={() => navigate(`/community/detail/${comment.id}`)}>
      <RecommendInfo>
        <InfoTop>
          {comment.questionTitle && <QuestionTitle>{comment.questionTitle}</QuestionTitle>}
        </InfoTop>
        <span className='questionTitle'>{comment.content}</span>
      </RecommendInfo>
    </Recommend>
  )
}

export const QuestionTitle = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
  padding-top: 0.375rem;
`

export default CommentListItem
