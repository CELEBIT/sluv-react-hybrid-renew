import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../components/styles'
import { ItemResult, RecommendItemResult } from '../../../apis/item/itemService.type'
import Item from '../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'

interface RecentItemProps {
  dataList?: Array<RecommendItemResult>
}

const RecentItemContainer = ({ dataList }: RecentItemProps) => {
  const navigate = useNavigate()

  return (
    <RecentItemWrap>
      <div className='title'>최근 본 아이템</div>
      <ItemList>
        {dataList?.map((item) => {
          return (
            <Item
              key={item.itemId}
              {...item}
              size={105}
              borderRadius={8}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
            ></Item>
          )
        })}
      </ItemList>
    </RecentItemWrap>
  )
}

export default RecentItemContainer

const RecentItemWrap = styled.div`
  margin-top: 1.5rem;

  .title {
    padding: 0.5625rem 1.25rem 0.5625rem 1.25rem;
    ${Pretendard({
      size: 15,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
`

export const ItemList = styled.div<{ gap?: number }>`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  gap: ${(props) => (props.gap ? `${props.gap * 0.0625}rem` : '0.75rem')};

  padding: 0 1.25rem;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`
