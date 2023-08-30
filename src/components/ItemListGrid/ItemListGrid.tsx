import React, { useState } from 'react'
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

interface ItemListGridProps {
  data: Array<RecommendItemResult> | undefined
  canChangeView: boolean
  emptyIcon?: string
  emptyTitle?: string
  emptySubTitle?: string
}

const ItemListGrid = ({
  data,
  canChangeView,
  emptyIcon,
  emptyTitle,
  emptySubTitle,
}: ItemListGridProps) => {
  const [viewSize, setViewSize] = useState('small')
  const navigate = useNavigate()
  return (
    <ItemListGridContainer>
      {canChangeView && (
        <ViewHeader>
          <ViewHeaderLeft>전체 {data?.length}</ViewHeaderLeft>
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
        {data ? (
          <>
            {data?.map((item) => (
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
            ))}
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
