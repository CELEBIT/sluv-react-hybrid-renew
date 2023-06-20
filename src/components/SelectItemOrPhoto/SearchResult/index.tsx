import styled from '@emotion/styled'
import { Common } from '../../styles'
import React, { useRef } from 'react'
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Brand } from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import BrandLogo from '../../BrandLogo/BrandLogo'
import useBrandSearchQuery from '../../../apis/brand/hooks/useBrandSearchQuery'

import { useObserver } from '../../../hooks/useObserver'
import { useDebounce } from 'use-debounce'
import HighlightedText from '../../HighlightedText/HighlightedText'
import { itemInfoState } from '../../../recoil/itemInfo'
import { brandNameSearchState } from '../../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import EmptyState from '../../EmptyState'
import HotItem from '../HotItem'
import { Divider } from '../../../pages/item/detail/styles'
import { atomKeys } from '../../../config/atomKeys'
import useItemSearchQuery from '../../../apis/search/hooks/useItemSearchQuery'
import { ListWrapper } from '../RecentViewItem/styles'
import Item from '../../RecommendedItem/Item'
import {
  communityQuestionMenuState,
  firstItemState,
  imgListState,
  secondItemState,
} from '../../../recoil/communityInfo'
import { RecentViewItemResult } from '../../../apis/item/itemService.type'
import { communityMenuState } from '../../Header/CommunityHeader/CommunityHeader'
import { maxItemPhotoCountState } from '..'

export const itemNameSearchState = atom<string>({
  key: atomKeys.itemNameSearchState,
  default: '',
})

const SearchResult = () => {
  const itemName = useRecoilValue(itemNameSearchState)
  const [debouncedItemName] = useDebounce(itemName, 300)
  const [imgItemList, setImageItemList] = useRecoilState(imgListState)

  const maxItemPhotoCount = useRecoilValue(maxItemPhotoCountState)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const CommunityMenu = useRecoilValue(communityMenuState)

  // 이 중에 뭐살까 추가용
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)

  const { searchItem } = useItemSearchQuery()
  const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
    searchItem(debouncedItemName)
  const tempData = data?.pages[0].content[0]
  const bottom = useRef(null)
  console.log('tempData', error)
  console.log('itemName', itemName)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })

  const handleItemClick = (item: RecentViewItemResult) => {
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

        if (CommunityMenu === '질문해요' && communityQuestionMenu === '이 중에 뭐 살까') {
          const newItem = {
            itemId: item.itemId,
            imgUrl: item.imgUrl,
            celebName: item.celebName,
            brandName: item.brandName,
            itemName: item.itemName,
          }
          if (firstItem?.itemId === null && firstItem?.imgUrl === null) {
            setFirstItem((prevFirstItem) => ({
              ...prevFirstItem,
              ...newItem,
            }))
          } else if (secondItem?.itemId === null && secondItem?.imgUrl === null) {
            setSecondItem((prevSecondItem) => ({
              ...prevSecondItem,
              ...newItem,
            }))
          }
        }
      }
    }
  }
  return (
    <SearchResultWrapper>
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
            icon='search'
            title='검색 결과가 없어요'
            subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
          ></EmptyState>
          <Divider className='full'></Divider>
          <HotItem></HotItem>
        </div>
      )}
    </SearchResultWrapper>
  )
}

export default SearchResult

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  padding-top: 1rem;
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  .full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
`
const EachBrand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 0 0.875rem 0.75rem;
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`
