import React from 'react'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { QuestionListWrapper } from '../../../../community/styles'
import CommentListItem from '../../../../../components/CommentListItem/CommentListItem'
import { Line } from '../../../../community/detail/styles'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'
import { ViewHeader, ViewHeaderLeft } from '../../../../../components/ItemListGrid/styles'
import { Common, Pretendard } from '../../../../../components/styles'
import styled from '@emotion/styled'

const CommentUpload = () => {
  const { getUserUploadComment } = useUserMypageQuery()
  const { data } = getUserUploadComment()
  const tempData = data?.pages[0].content
  return (
    <QuestionListWrapper>
      <CountHeader>
        <CountHeaderLeft>전체 {data && data.pages[0].countNum}</CountHeaderLeft>
      </CountHeader>
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

export const CountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
`

export const CountHeaderLeft = styled.div`
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
