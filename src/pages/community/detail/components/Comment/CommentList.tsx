import React from 'react'
import useSearchCommentQuery from '../../../../../apis/comment/hooks/useSearchCommentQuery'
import EmptyState from '../../../../../components/EmptyState'

import { ReactComponent as ShowMore } from '../../../../../assets/add_24.svg'
import { ReactComponent as StorageOff } from '../../../../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../../assets/storage_on_24.svg'
import { CommentContainer } from './styles'
import Comment from './Comment'
import CommentBlur from './CommentBlur'
import styled from '@emotion/styled'
interface CommentListProps {
  questionId: number
  isPreview?: boolean
}

const CommentList = ({ questionId, isPreview }: CommentListProps) => {
  const { getCommentList, getTestCommentList } = useSearchCommentQuery()
  const { data } = getCommentList(questionId)
  // const { data } = getTestCommentList(questionId)
  // alert(isPreview)
  console.log(data)
  if (data && data.length > 0) {
    return (
      <CommentContainer>
        {isPreview ? (
          <BlurLayout>
            {data.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  questionId={questionId}
                  isPreview={true}
                ></Comment>
              )
            })}
            <CommentBlur></CommentBlur>
          </BlurLayout>
        ) : (
          <>
            {data.map((comment) => {
              return (
                <Comment key={comment.id} commentId={comment.id} questionId={questionId}></Comment>
              )
            })}
          </>
        )}
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

const BlurLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 18.75rem;
  overflow: hidden;
`
