import React, { useRef } from 'react'
import { useObserver } from '../../../hooks/useObserver'
import EmptyState from '../../EmptyState'
import Item from '../../RecommendedItem/Item'
import { ListWrapper, RecentViewItemContainer } from '../RecentViewItem/styles'
import useScrapItemQuery from '../../../apis/item/hooks/useScrapItemQuery'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../../recoil/communityInfo'
import { RecentViewItemResult } from '../../../apis/item/itemService.type'

const ScrapItem = () => {
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)

  const handleItemClick = (item: RecentViewItemResult) => {
    // 이미 item이 추가되어 있는 경우, communityUploadInfo.itemList에서 삭제
    const isItemAdded = communityUploadInfo.itemList?.some(
      (addedItem) => addedItem.itemId === item.itemId,
    )
    if (isItemAdded) {
      const newItemList = communityUploadInfo.itemList?.filter(
        (addedItem) => addedItem.itemId !== item.itemId,
      )
      setCommunityUploadInfo({
        ...communityUploadInfo,
        itemList: newItemList || null,
      })
    } else {
      // communityUploadInfo.itemList에 item 추가
      const newItemList = [
        ...(communityUploadInfo.itemList || []),
        {
          itemId: item.itemId,
          description: null,
          vote: null,
          representFlag: null,
        },
      ]
      setCommunityUploadInfo({ ...communityUploadInfo, itemList: newItemList })
    }
  }

  const bottom = useRef(null)
  const { getScrapItem } = useScrapItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getScrapItem()
  const tempData = data?.pages[0].content[0]

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })
  return (
    <RecentViewItemContainer>
      {tempData ? (
        <ListWrapper>
          {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
          {status === 'success' &&
            data?.pages.map(
              (item) =>
                item.content.length > 0 &&
                item.content.map((each) => {
                  return (
                    <Item
                      key={each.itemId}
                      itemId={each.itemId}
                      itemName={each.itemName}
                      imgUrl={each.imgUrl}
                      brandName={each.brandName}
                      celebName={each.celebName}
                      isSelected={
                        communityUploadInfo.itemList
                          ? communityUploadInfo.itemList?.some(
                              (item) => item.itemId === each.itemId,
                            )
                          : false
                      }
                      borderRadius={8}
                      onClick={() => handleItemClick(each)}
                    ></Item>
                  )
                }),
            )}
          <div ref={bottom} />
          {isFetching && !isFetchingNextPage ? (
            <div className='spinner'>
              <div>Loading</div>
            </div>
          ) : null}
        </ListWrapper>
      ) : (
        <EmptyState
          icon='save'
          title='저장한 아이템이 없어요'
          subtitle='다양한 셀럽의 아이템을 저장해 보아요'
        ></EmptyState>
      )}
    </RecentViewItemContainer>
  )
}

export default ScrapItem
