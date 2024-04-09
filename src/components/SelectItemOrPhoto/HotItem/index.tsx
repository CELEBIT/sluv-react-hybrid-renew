import React, { useState } from 'react'
import Item from '../../RecommendedItem/Item'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { HotItemListWrapper, ListWrapper, TitleText } from './styles'
import { ItemResult } from '../../../apis/item/itemService.type'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  IselectedItem,
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  imgItemListState,
  secondItemState,
} from '../../../recoil/communityInfo'
import { maxItemPhotoCountState } from '..'
import useRecommendHotItemQuery from '../../../apis/item/hooks/useRecommendHotItemQuery'
import useUserMypageQuery from '../../../apis/user/hooks/useUserMypageQuery'

const HotItem = () => {
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const maxItemPhotoCount = useRecoilValue(maxItemPhotoCountState)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)

  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)

  const handleItemClick = (item: ItemResult) => {
    // console.log(imgItemList)
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
          representFlag: null,
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
            representFlag: null,
          },
        ])

        if (communityQuestionMenu === '이 중에 뭐 살까') {
          const newItem = {
            itemId: item.itemId,
            imgUrl: item.imgUrl,
            celebName: item.celebName,
            brandName: item.brandName,
            itemName: item.itemName,
          }
          if (firstItem?.itemId === null) {
            // console.log(firstItem)
            setFirstItem((prevFirstItem) => ({
              ...prevFirstItem,
              ...newItem,
            }))
          } else if (secondItem?.itemId === null) {
            // console.log(secondItem)
            setSecondItem((prevSecondItem) => ({
              ...prevSecondItem,
              ...newItem,
            }))
          }
        }
      }
    }
  }
  const { getRecommendHotItem } = useRecommendHotItemQuery()
  const { data } = getRecommendHotItem()

  const { getMypageInfo } = useUserMypageQuery()
  const nickname = getMypageInfo.data?.userInfo.nickName

  return (
    <HotItemListWrapper>
      <TitleText>{nickname}님을 위한 인기 아이템</TitleText>
      <ListWrapper>
        {data?.pages[0].content.map((each) => {
          return (
            <Item
              key={each.itemId}
              itemId={each.itemId}
              itemName={each.itemName}
              imgUrl={each.imgUrl}
              brandName={each.brandName}
              celebName={each.celebName}
              isSelected={
                imgItemList ? imgItemList.some((item) => item.itemId === each.itemId) : false
              }
              size={105}
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
