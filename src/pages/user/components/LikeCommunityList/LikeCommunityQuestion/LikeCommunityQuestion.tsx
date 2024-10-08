import React from 'react'
import { QuestionListWrapper } from '../../../../community/styles'
import QuestionListItem from '../../../../../components/QuestionListItem/QuestionListItem'
import { Line } from '../../../../community/detail/styles'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const LikeCommunityQuestion = () => {
  const { getUserLikedQuestion } = useUserMypageQuery()
  const { data } = getUserLikedQuestion()
  const tempData = data?.pages[0].content

  return (
    <>
      {tempData && tempData.length > 0 ? (
        <QuestionListWrapper>
          {tempData?.map((each, index) => {
            return (
              <>
                <QuestionListItem key={each.id} item={each} detail={true}></QuestionListItem>
                {index !== tempData.length - 1 && <Line></Line>}
              </>
            )
          })}
        </QuestionListWrapper>
      ) : (
        <EmptyStateWrapper>
          <EmptyState
            icon='like'
            title='좋아요한 게시글이 없어요'
            subtitle='마음에 드는 게시글에 좋아요해 보아요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </>
  )
}

export default LikeCommunityQuestion
