import React from 'react'
import useSearchCommentQuery from '../../../../../apis/comment/hooks/useSearchCommentQuery'
import EmptyState from '../../../../../components/EmptyState'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import {
  BrandName,
  CelebName,
  CommentContainer,
  CommentContent,
  CommentExpression,
  CommentWrapper,
  ContentLeft,
  ContentRight,
  ContentTop,
  ContentWrapper,
  Img,
  Item,
  ItemName,
  ItemTextWrapper,
  ItemWrapper,
  NickName,
  Time,
  UserImg,
  UserInfo,
} from './styles'
import { formatUpdatedAt } from '../../../../../utils/utility'
import SubCommentList from '../SubCommentList/SubCommentList'
import { ExpressionWrapper, LikeWrapper } from '../SubCommentList/styles'
import { ReactComponent as LikeOff } from '../../../../../assets/like_off_18.svg'
import { ReactComponent as LikeOn } from '../../../../../assets/like_on_18.svg'
import { useNavigate } from 'react-router-dom'
import Comment from './Comment'
interface CommentListProps {
  questionId: number
}

const CommentList = ({ questionId }: CommentListProps) => {
  const { getComment } = useSearchCommentQuery()
  const { data } = getComment(questionId)
  if (data && data.length > 0) {
    return (
      <CommentContainer>
        {data.map((comment) => {
          return <Comment key={comment.id} comment={comment} questionId={questionId}></Comment>
        })}
      </CommentContainer>
    )
  } else {
    return (
      <EmptyState
        icon='comment'
        title='아직 댓글이 없어요'
        subtitle='스러버를위해 첫 댓글을 남겨보세요'
      ></EmptyState>
    )
  }
}

export default CommentList
