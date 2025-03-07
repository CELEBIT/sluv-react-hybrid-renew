import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { useObserver } from '../../../hooks/useObserver'
import { useDebounce } from 'use-debounce'
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
  imgItemListState,
  secondItemState,
} from '../../../recoil/communityInfo'
import { ItemResult } from '../../../apis/item/itemService.type'
import { communityMenuState } from '../../Header/CommunityHeader/CommunityHeader'
import { finalSearchState, maxItemPhotoCountState } from '..'
import Loading from '../../Loading'
import { toast } from 'react-toastify'

export const itemNameSearchState = atom<string>({
  key: atomKeys.itemNameSearchState,
  default: '',
})

const SearchItemPhotoResult = () => {
  const itemName = useRecoilValue(finalSearchState)
  const [debouncedItemName] = useDebounce(itemName, 500)
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)

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

  const bottom = useRef(null)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })

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
          setFirstItem((prev) => ({
            ...prev,
            ...{ itemId: null, imgUrl: null, brandName: null, celebName: null, itemName: null },
          }))
        }
        // 오른쪽 사진/아이템 삭제
        if (secondItem.itemId === item.itemId) {
          // resetSecondItem()
          setSecondItem((prev) => ({
            ...prev,
            ...{ itemId: null, imgUrl: null, brandName: null, celebName: null, itemName: null },
          }))
        }
      }
    } else {
      // 추가되어있지 않은 아이템 communityUploadInfo.itemList에 item 추가
      if (imgItemList.length + 1 > maxItemPhotoCount) {
        toast('아이템 개수가 최대값을 초과했어요')
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
          if (firstItem?.itemId === null && firstItem?.imgFile === null) {
            console.log(firstItem)
            setFirstItem((prevFirstItem) => ({
              ...prevFirstItem,
              ...newItem,
            }))
          } else if (secondItem?.itemId === null && secondItem?.imgFile === null) {
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

  return (
    <SearchResultWrapper>
      {data && data.pages[0].content.length > 0 ? (
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
                      size={105}
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
              <Loading />
            </div>
          ) : null}
        </ListWrapper>
      ) : (
        <div>
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

export default SearchItemPhotoResult

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
