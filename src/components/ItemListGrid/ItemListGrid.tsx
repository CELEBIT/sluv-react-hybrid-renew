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
import { EmptyStateContainer } from '../EmptyState/styles'
import { GetClosetRes } from '../../apis/closet'
import ClosetInnerItem from '../../pages/closet/components/ClosetInnerItem'

interface ItemListGridProps {
  data?: InfiniteData<GetPaginationResult<RecommendItemResult>> | undefined
  closetData?: InfiniteData<GetClosetRes>
  context?: any
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
  closetData,
  context,
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
  if (data)
    return (
      <ItemListGridContainer>
        {canChangeView && data && data?.pages[0].content.length > 0 && (
          <ViewHeader>
            <ViewHeaderLeft>전체 {data.pages[0].countNum ?? totalLength}</ViewHeaderLeft>
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
            <EmptyStateContainer>
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
            </EmptyStateContainer>
          )}
        </ItemListWrapper>
      </ItemListGridContainer>
    )
  else if (closetData) {
    return (
      <ItemListGridContainer>
        <ItemListWrapper className='closet'>
          {status === 'success' && closetData && closetData.pages[0].content.length > 0 ? (
            <>
              {closetData?.pages.map(
                (item) =>
                  item.content.length > 0 &&
                  item.content.map((item) => {
                    return (
                      <ClosetInnerItem
                        service={item}
                        isEditMode={context.states.isEditMode}
                        key={item.itemId}
                        onSelectItem={context.handlers.handleSelectItem}
                      />
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
            <EmptyStateContainer>
              <EmptyState
                icon={emptyIcon ? emptyIcon : 'item'}
                title={emptyTitle ? emptyTitle : '아이템이 없어요'}
                subtitle={
                  emptyTitle
                    ? emptyTitle
                    : `아이템이 저장 될 때까지
조금만 기다려 주세요`
                }
              ></EmptyState>
            </EmptyStateContainer>
          )}
        </ItemListWrapper>
      </ItemListGridContainer>
    )
  } else return null
}

export default ItemListGrid
