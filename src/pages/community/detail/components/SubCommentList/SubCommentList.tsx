import React from 'react'
import { ShowMoreSubCommentWrapper, SubCommentListContainer } from './styles'
import useSearchSubCommentQuery from '../../../../../apis/comment/hooks/useSearchSubCommentQuery'
import SubComment from './SubComment'
import { ReactComponent as SubCommentArrow } from '../../../../../assets/arrow_comment_18.svg'
import { ReactComponent as ArrowDown } from '../../../../../assets/arrow_down_13.svg'
import { CommentResult } from '../../../../../apis/comment/commentService.type'

interface SubcommentProps {
  comment: CommentResult
  questionId: number
}

const SubCommentList = ({ comment }: SubcommentProps) => {
  const { getSubComment } = useSearchSubCommentQuery()
  const { data } = getSubComment(comment.id)
  // console.log('subcomment', data)
  const showRestComment = data?.restCommentNum !== undefined ? data.restCommentNum > 0 : false
  function convertToUTC(dateString: string): string {
    const date = new Date(dateString)
    date.setHours(date.getHours() + 9)
    return date.toUTCString()
  }
  if (data && data.content.length > 0) {
    return (
      <SubCommentListContainer>
        {data.content.map((subcomment) => {
          return (
            <SubComment subcomment={subcomment} comment={comment} key={subcomment.id}></SubComment>
          )
        })}
        {showRestComment && (
          <ShowMoreSubCommentWrapper>
            <SubCommentArrow style={{ flexShrink: 0 }}></SubCommentArrow>
            <span>답글 {data.restCommentNum}개 더보기</span>
            <ArrowDown></ArrowDown>
          </ShowMoreSubCommentWrapper>
        )}
      </SubCommentListContainer>
    )
  } else return null
}

export default SubCommentList
