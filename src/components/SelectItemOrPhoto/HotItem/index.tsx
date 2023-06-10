import React, { useState } from 'react'
import { ItemList, TitleText } from '../../RecommendedItem/RecommendedItemList'
import Item from '../../RecommendedItem/Item'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { HotItemListWrapper, ListWrapper } from './styles'
import { RecentViewItemResult } from '../../../apis/item/itemService.type'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  IselectedItem,
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  secondItemState,
} from '../../../recoil/communityInfo'
import { maxItemPhotoCountState } from '..'

const HotItem = () => {
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const maxItemPhotoCount = useRecoilValue(maxItemPhotoCountState)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)
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
        ...(communityUploadInfo.itemList || []),
        {
          itemId: item.itemId,
          description: null,
          vote: null,
          representFlag: null,
        },
      ]
      if (newItemList.length + (communityUploadInfo?.imgList?.length ?? 0) > maxItemPhotoCount) {
        alert('아이템의 개수가 최대값을 초과하였습니다.')
      } else {
        setCommunityUploadInfo({
          ...communityUploadInfo,
          itemList: newItemList,
        })
        if (communityQuestionMenu === '이 중에 뭐 살까') {
          const newItem = {
            itemId: item.itemId,
            imgUrl: item.imgUrl,
            celebName: item.celebName,
            brandName: item.brandName,
            itemName: item.itemName,
          }
          if (firstItem?.itemId === null) {
            setFirstItem((prevFirstItem) => ({
              ...prevFirstItem,
              ...newItem,
            }))
          } else if (secondItem?.itemId === null) {
            setSecondItem((prevSecondItem) => ({
              ...prevSecondItem,
              ...newItem,
            }))
          }
        }
      }
    }
  }
  const { getItemDetail } = useItemDetailQuery()
  const { data } = getItemDetail(35)
  return (
    <HotItemListWrapper>
      <TitleText>리노님을 위한 인기 아이템</TitleText>
      <ListWrapper>
        {data?.sameBrandItemList.map((each) => {
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
                  ? communityUploadInfo.itemList?.some((item) => item.itemId === each.itemId)
                  : false
              }
              size={103}
              borderRadius={8}
              onClick={() => handleItemClick(each)}
            ></Item>
          )
        })}
      </ListWrapper>
    </HotItemListWrapper>
  )
}

export default HotItem
