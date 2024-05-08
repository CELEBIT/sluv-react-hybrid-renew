import React from 'react'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { QuestionListWrapper } from '../../../../community/styles'
import CommentListItem from '../../../../../components/CommentListItem/CommentListItem'
import { Line } from '../../../../community/detail/styles'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const CommentUpload = () => {
  const { getUserUploadComment } = useUserMypageQuery()
  const { data } = getUserUploadComment()
  const tempData = data?.pages[0].content
  return (
    <QuestionListWrapper>
      {tempData && tempData.length > 0 ? (
        tempData?.map((each, index) => {
          return (
            <>
              <CommentListItem key={each.id} comment={each}></CommentListItem>
              {index !== tempData.length - 1 && <Line></Line>}
            </>
          )
        })
      ) : (
        <EmptyStateWrapper>
          <EmptyState
            icon='comment'
            title='업로드한 댓글이 없어요'
            subtitle='스러버를 위해 댓글을 남겨보세요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </QuestionListWrapper>
  )
}

export default CommentUpload
