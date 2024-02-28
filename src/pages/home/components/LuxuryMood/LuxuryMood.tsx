import React from 'react'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { ReactComponent as Luxury } from '../../../../assets/badge_title_luxury.svg'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import Item from '../../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import useLuxuryItemQuery from '../../../../apis/item/hooks/useLuxuryItemQuery'

const LuxuryMood = () => {
  const navigate = useNavigate()

  const { getLuxuryItem } = useLuxuryItemQuery()
  const { data } = getLuxuryItem()
  const tempData = data?.pages[0].content

  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title'>
        <Luxury></Luxury>
        <HomeTitle>주목해야할 럭셔리 무드</HomeTitle>
      </HomeTitleWrapper>
      <ItemList gap={11}>
        {tempData?.map((item) => {
          return (
            <Item
              key={'luxury' + item.itemId}
              {...item}
              size={182}
              borderRadius={8}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
            ></Item>
          )
        })}
      </ItemList>
    </ScrollComponentWrapper>
  )
}

export default LuxuryMood
