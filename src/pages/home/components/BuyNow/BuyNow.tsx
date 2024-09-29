import React from 'react'
import { ReactComponent as Now } from '../../../../assets/badge_title_now.svg'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import Item from '../../../../components/RecommendedItem/Item'
import useBuyNowItemQuery from '../../../../apis/item/hooks/useBuyNowItemQuery'
import { PreviewProps } from '../..'
import useModals from '../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../components/Modals'

const BuyNow = ({ isPreview }: PreviewProps) => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const { getBuyNowItem } = useBuyNowItemQuery()
  const { data } = getBuyNowItem()
  const tempData = data?.pages[0].content

  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title shortTop'>
        <Now></Now>
        <HomeTitle>당장 구매할 수 있어요</HomeTitle>
      </HomeTitleWrapper>
      <ItemList gap={11}>
        {tempData?.map((item) => {
          return (
            <Item
              key={'buyNow' + item.itemId}
              {...item}
              size={182}
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

export default BuyNow
