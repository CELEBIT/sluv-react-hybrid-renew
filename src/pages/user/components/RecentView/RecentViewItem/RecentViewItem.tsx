import React, { useEffect } from 'react'
import useRecentViewItemQuery from '../../../../../apis/item/hooks/useRecentViewItemQuery'
import ItemListGrid from '../../../../../components/ItemListGrid/ItemListGrid'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const RecentViewItem = () => {
  const { getRecentViewItem } = useRecentViewItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage, refetch } =
    getRecentViewItem()

  const tempData = data?.pages[0].content

  useEffect(() => {
    refetch()
  }, [])
  return (
    <>
      {tempData && tempData.length > 0 ? (
        <ItemListGrid
          data={data}
          canChangeView={true}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          status={status}
        ></ItemListGrid>
      ) : (
        <EmptyStateWrapper>
          <EmptyState
            icon='clock'
            title='최근 본 아이템이 없어요'
            subtitle='다양한 셀럽의 아이템을 구경해 보아요'
          ></EmptyState>
        </EmptyStateWrapper>
      )}
    </>
  )
}
export default RecentViewItem
