import React from 'react'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { QuestionListWrapper } from '../../../../community/styles'
import CommentListItem from '../../../../../components/CommentListItem/CommentListItem'
import { Line } from '../../../../community/detail/styles'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const LikeCommunityComment = () => {
  const { getLikedComment } = useUserMypageQuery()
  const { data } = getLikedComment()
  const tempData = data?.pages[0].content
  console.log(tempData)
  return (
    <>
      {tempData && tempData.length > 0 ? (
        <QuestionListWrapper>
          {tempData?.map((each, index) => {
            return (
              <>
                <CommentListItem key={each.id} comment={each}></CommentListItem>
                {index !== tempData.length - 1 && <Line></Line>}
              </>
            )
          })}
        </QuestionListWrapper>
      ) : (
        <EmptyStateWrapper>
          <EmptyState
            icon='like'
            title='좋아요한 댓글이 없어요'
            subtitle='마음에 드는 댓글에 좋아요해 보아요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </>
  )
}

export default LikeCommunityComment
