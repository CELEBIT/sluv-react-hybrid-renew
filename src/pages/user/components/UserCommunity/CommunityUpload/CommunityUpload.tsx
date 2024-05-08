import React from 'react'
import { QuestionListWrapper } from '../../../../community/styles'
import QuestionListItem from '../../../../../components/QuestionListItem/QuestionListItem'
import { Line } from '../../../../community/detail/styles'
import useQuestionListQuery from '../../../../../apis/question/hooks/useQuestionListQuery'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const CommunityUpload = () => {
  const { getUserUploadQuestion } = useUserMypageQuery()
  const { data } = getUserUploadQuestion()
  const tempData = data?.pages[0].content

  return (
    <QuestionListWrapper>
      {tempData && tempData?.length > 0 ? (
        tempData?.map((each, index) => {
          return (
            <>
              <QuestionListItem key={each.id} item={each}></QuestionListItem>
              {index !== tempData.length - 1 && <Line></Line>}
            </>
          )
        })
      ) : (
        <EmptyStateWrapper>
          <EmptyState
            icon='comment'
            title='업로드한 게시글이 없어요'
            subtitle='궁금한 셀럽의 아이템 정보를 물어보아요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </QuestionListWrapper>
  )
}

export default CommunityUpload
