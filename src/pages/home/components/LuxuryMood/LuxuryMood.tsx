import React from 'react'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'
import { ReactComponent as Luxury } from '../../../../assets/badge_title_luxury.svg'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import Item from '../../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'

const LuxuryMood = () => {
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
  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title'>
        <Luxury></Luxury>
        <HomeTitle>주목해야할 럭셔리 무드</HomeTitle>
      </HomeTitleWrapper>
      <ItemList gap={11}>
        {itemList?.map((item) => {
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

export default LuxuryMood
