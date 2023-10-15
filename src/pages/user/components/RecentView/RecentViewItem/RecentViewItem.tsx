import React from 'react'
import useRecentViewItemQuery from '../../../../../apis/item/hooks/useRecentViewItemQuery'
import ItemListGrid from '../../../../../components/ItemListGrid/ItemListGrid'
import { EmptyStateWrapper } from '../../FollowList/Follower/Follower'
import EmptyState from '../../../../../components/EmptyState'

const RecentViewItem = () => {
  const { getRecentViewItem } = useRecentViewItemQuery()
  const { data } = getRecentViewItem()
  console.log(data)
  const tempData = data?.pages[0].content
  return (
    <>
      {tempData && tempData.length > 0 ? (
        <ItemListGrid data={tempData} canChangeView={true}></ItemListGrid>
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
