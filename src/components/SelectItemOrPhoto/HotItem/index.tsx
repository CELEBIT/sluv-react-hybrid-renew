import React from 'react'
import { ItemList, TitleText } from '../../RecommendedItem/RecommendedItemList'
import Item from '../../RecommendedItem/Item'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { HotItemListWrapper, ListWrapper } from './styles'
import { RecentViewItemResult } from '../../../apis/item/itemService.type'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../../recoil/communityInfo'

const HotItem = () => {
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

      const newImgList = communityUploadInfo.imgList || []

      if (newItemList.length + newImgList.length > 5) {
        alert('아이템의 개수가 최대값을 초과하였습니다.')
      } else {
        setCommunityUploadInfo({
          ...communityUploadInfo,
          itemList: newItemList,
        })
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
