import React, { useRef, useState } from 'react'
import { RecommendItemResult } from '../../apis/item/itemService.type'
import {
  ItemListGridContainer,
  ItemListWrapper,
  ViewHeader,
  ViewHeaderLeft,
  ViewHeaderRight,
} from './styles'
import Item from '../RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../EmptyState'
import { ReactComponent as ViewSmallOff } from '../../assets/view_small_off_24.svg'
import { ReactComponent as ViewSmallOn } from '../../assets/view_small_on_24.svg'
import { ReactComponent as ViewBigOff } from '../../assets/view_big_off_24.svg'
import { ReactComponent as ViewBigOn } from '../../assets/view_big_on_24.svg'
import { useObserver } from '../../hooks/useObserver'
import { InfiniteData } from '@tanstack/react-query'
import { GetPaginationResult } from '../../apis/core/type'

interface ItemListGridProps {
  data: InfiniteData<GetPaginationResult<RecommendItemResult>> | undefined
  canChangeView: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptySubTitle?: string
  isFetching?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: any
  status?: string
}

const ItemListGrid = ({
  data,
  canChangeView,
  emptyIcon,
  emptyTitle,
  emptySubTitle,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  status,
}: ItemListGridProps) => {
  const [viewSize, setViewSize] = useState('small')
  const navigate = useNavigate()
  const bottom = useRef(null)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })
  let totalLength = 0
  data?.pages.forEach((page) => {
    totalLength += page.content.length
  })

  return (
    <ItemListGridContainer>
      {canChangeView && data && data?.pages[0].content.length && (
        <ViewHeader>
          <ViewHeaderLeft>전체 {totalLength}</ViewHeaderLeft>
          {viewSize === 'small' ? (
            <ViewHeaderRight>
              <ViewSmallOn></ViewSmallOn>
              <ViewBigOff onClick={() => setViewSize('big')}></ViewBigOff>
            </ViewHeaderRight>
          ) : (
            <ViewHeaderRight>
              <ViewSmallOff onClick={() => setViewSize('small')}></ViewSmallOff>
              <ViewBigOn></ViewBigOn>
            </ViewHeaderRight>
          )}
        </ViewHeader>
      )}
      <ItemListWrapper>
        {status === 'success' && data && data.pages[0].content.length > 0 ? (
          <>
            {data?.pages.map(
              (item) =>
                item.content.length > 0 &&
                item.content.map((item) => {
                  return (
                    <>
                      {viewSize === 'small' ? (
                        <Item
                          key={item.itemId}
                          {...item}
                          size={105}
                          borderRadius={8}
                          onClick={() => navigate(`/item/detail/${item.itemId}`)}
                        ></Item>
                      ) : (
                        <Item
                          key={item.itemId}
                          {...item}
                          size={160}
                          borderRadius={8}
                          onClick={() => navigate(`/item/detail/${item.itemId}`)}
                        ></Item>
                      )}
                    </>
                  )
                }),
            )}

            <div ref={bottom} />
            {isFetching && !isFetchingNextPage ? (
              <div className='spinner'>
                <div>Loading</div>
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState
            icon={emptyIcon ? emptyIcon : 'item'}
            title={emptyTitle ? emptyTitle : '아이템이 없어요'}
            subtitle={
              emptyTitle
                ? emptyTitle
                : `아이템이 업로드 될 때까지
  조금만 기다려 주세요`
            }
          ></EmptyState>
        )}
      </ItemListWrapper>
    </ItemListGridContainer>
  )
}

export default ItemListGrid
