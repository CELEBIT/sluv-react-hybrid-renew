import React from 'react'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { ReactComponent as New } from '../../../../assets/badge_title_new.svg'
import { useNavigate } from 'react-router-dom'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import Item from '../../../../components/RecommendedItem/Item'
import useNewItemQuery from '../../../../apis/item/hooks/useNewItemQuery'

const NewItems = () => {
  const navigate = useNavigate()

  const { getNewItem } = useNewItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getNewItem()
  const tempData = data?.pages[0].content
  console.log('tempData', tempData)

  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title'>
        <New></New>
        <HomeTitle>실시간 NEW 아이템</HomeTitle>
      </HomeTitleWrapper>
      <ItemList gap={10}>
        {tempData?.map((item) => {
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
    </ScrollComponentWrapper>
  )
}

export default NewItems
