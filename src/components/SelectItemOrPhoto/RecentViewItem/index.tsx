import React, { useRef } from 'react'
import useRecentViewItemQuery from '../../../apis/item/hooks/useRecentViewItemQuery'
import { useObserver } from '../../../hooks/useObserver'
import EmptyState from '../../EmptyState'
import { ListWrapper, RecentViewItemContainer } from './styles'
import Item from '../../RecommendedItem/Item'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  IitemList,
  IselectedItem,
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  imgItemListState,
  secondItemState,
} from '../../../recoil/communityInfo'
import { ItemResult } from '../../../apis/item/itemService.type'
import { Divider } from '../../../pages/item/detail/styles'
import HotItem from '../HotItem'
import { maxItemPhotoCountState } from '..'
import { communityMenuState } from '../../Header/CommunityHeader/CommunityHeader'

const RecentViewItem = () => {
  const bottom = useRef(null)
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const maxItemPhotoCount = useRecoilValue(maxItemPhotoCountState)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const CommunityMenu = useRecoilValue(communityMenuState)

  // 최근 본 아이템 API data
  const { getRecentViewItem } = useRecentViewItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getRecentViewItem()
  const tempData = data?.pages[0].content[0]

  // 이 중에 뭐살까 추가용
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)

  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)

  const handleItemClick = (item: ItemResult) => {
    console.log(imgItemList)
    // 이미 item이 추가되어 있는 경우, communityUploadInfo.itemList에서 삭제
    const isItemAdded = imgItemList.some((addedItem) => addedItem.itemId === item.itemId)
    if (isItemAdded) {
      const newItemList = imgItemList.filter((addedItem) => addedItem.itemId !== item.itemId)
      setImageItemList(newItemList)

      if (communityQuestionMenu === '이 중에 뭐 살까') {
        // 왼쪽 사진/아이템 삭제
        if (firstItem.itemId === item.itemId) {
          resetFirstItem()
        }
        // 오른쪽 사진/아이템 삭제
        if (secondItem.itemId === item.itemId) {
          resetSecondItem()
        }
      }
    } else {
      // 추가되어있지 않은 아이템 communityUploadInfo.itemList에 item 추가
      const newItemList = [
        ...(imgItemList || []),
        {
          itemId: item.itemId,
          description: null,
          vote: null,
          representFlag: false,
        },
      ]

      if (imgItemList.length + 1 > maxItemPhotoCount) {
        alert('아이템의 개수가 최대값을 초과하였습니다.')
      } else {
        setImageItemList([
          ...imgItemList,
          {
            itemId: item.itemId,
            imgUrl: item.imgUrl,
            description: null,
            vote: null,
            representFlag: false,
          },
        ])

        if (CommunityMenu === '이 중에 뭐 살까') {
          const newItem = {
            itemId: item.itemId,
            imgUrl: item.imgUrl,
            celebName: item.celebName,
            brandName: item.brandName,
            itemName: item.itemName,
          }
          if (firstItem?.itemId === null && firstItem?.imgUrl === null) {
            console.log(firstItem)
            setFirstItem((prevFirstItem) => ({
              ...prevFirstItem,
              ...newItem,
            }))
          } else if (secondItem?.itemId === null && secondItem?.imgUrl === null) {
            console.log(secondItem)
            setSecondItem((prevSecondItem) => ({
              ...prevSecondItem,
              ...newItem,
            }))
          }
        }
      }
    }
  }

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
                        imgItemList
                          ? imgItemList.some((item) => item.itemId === each.itemId)
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
        <div className='full'>
          <EmptyState
            icon='clock'
            title='최근 본 아이템이 없어요'
            subtitle='다양한 셀럽의 아이템을 구경해 보아요'
          ></EmptyState>
          <Divider className='full'></Divider>
          <HotItem></HotItem>
        </div>
      )}
    </RecentViewItemContainer>
  )
}

export default RecentViewItem
