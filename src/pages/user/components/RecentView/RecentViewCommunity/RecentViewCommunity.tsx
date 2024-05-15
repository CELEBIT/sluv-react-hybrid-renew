import React, { useEffect } from 'react'
import useUserMypageQuery from '../../../../../apis/user/hooks/useUserMypageQuery'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'
import QuestionListItem from '../../../../../components/QuestionListItem/QuestionListItem'
import { Line } from '../../../../community/detail/styles'
import styled from '@emotion/styled'

const RecentViewCommunity = () => {
  const { getRecentViewCommunityItem } = useUserMypageQuery()
  const { data, refetch } = getRecentViewCommunityItem()
  const tempData = data?.pages[0].content
  useEffect(() => {
    refetch()
  }, [])
  return (
    <>
      {tempData && tempData.length > 0 ? (
        <QuestionListWrapper>
          {tempData.map((each, index) => {
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
            icon='clock'
            title='최근 본 커뮤니티가 없어요'
            subtitle='궁금한 셀럽의 아이템 정보를 물어보아요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </>
  )
}

const QuestionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 3.125rem;
`

export default RecentViewCommunity
