import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import Item from '../../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import useEfficientItemQuery from '../../../../apis/item/hooks/useEfficientItemQuery'
import { PreviewProps } from '../..'

const PresentItem = ({ isPreview }: PreviewProps) => {
  const navigate = useNavigate()

  const { getEfficientItem } = useEfficientItemQuery()
  const { data } = getEfficientItem()
  const tempData = data?.pages[0].content
  return (
    <ScrollComponentWrapper>
      <HomeTitle className='title'>가성비 좋은 선물템</HomeTitle>
      <ItemList gap={10}>
        {tempData?.map((item) => {
          return (
            <Item
              key={'present' + item.itemId}
              {...item}
              size={105}
              borderRadius={8}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
              isPreview={isPreview}
            ></Item>
          )
        })}
      </ItemList>
    </ScrollComponentWrapper>
  )
}
export default PresentItem
