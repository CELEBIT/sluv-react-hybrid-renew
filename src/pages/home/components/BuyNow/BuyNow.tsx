import React from 'react'
import { ReactComponent as Now } from '../../../../assets/badge_title_now.svg'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import Item from '../../../../components/RecommendedItem/Item'
import useBuyNowItemQuery from '../../../../apis/item/hooks/useBuyNowItemQuery'

const BuyNow = () => {
  const navigate = useNavigate()

  const itemList = [
    {
      itemId: 35,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트라고하면어떻게될까',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '투모로우바이투게터 휴닝카이',
      scrapStatus: false,
    },
    {
      itemId: 1,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 2,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 3,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 4,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 5,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 6,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
    {
      itemId: 7,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '스트레이키즈 리노',
      scrapStatus: false,
    },
  ]
  const { getBuyNowItem } = useBuyNowItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getBuyNowItem()
  const tempData = data?.pages[0].content
  console.log('tempData', tempData)
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
              key={item.itemId}
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

export default BuyNow
