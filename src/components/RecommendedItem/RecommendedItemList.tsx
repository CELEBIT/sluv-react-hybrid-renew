import React from 'react'
import Item from './Item'
import { Common, Pretendard } from '../styles'
import { RecommendItemResult } from '../../apis/item/itemService.type'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

interface RecommendedItemProps {
  title: string
  list: Array<RecommendItemResult> | undefined
}

const RecommendedItemList = ({ title, list }: RecommendedItemProps) => {
  const navigate = useNavigate()
  return (
    <RecommendedItemListWrapper>
      <TitleText>{title}</TitleText>
      <ItemList>
        {list?.map((item) => {
          return (
            <Item
              key={item.itemId}
              {...item}
              size={150}
              borderRadius={8}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
            ></Item>
          )
        })}
      </ItemList>
    </RecommendedItemListWrapper>
  )
}

export default RecommendedItemList

const RecommendedItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ItemList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  gap: 0.75rem;
  padding: 0 1.25rem;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`

const TitleText = styled.div`
  padding: 0 1.25rem;
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
