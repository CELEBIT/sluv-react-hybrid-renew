import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import ItemCard from './components/ItemCard'
import styled from '@emotion/styled'
import { ReactComponent as HeartArrow } from '../../../../assets/heart_arrow.svg'
import { useNavigate } from 'react-router-dom'

const Curation = () => {
  const navigate = useNavigate()
  const itemList = [
    {
      itemId: 35,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트라고하면어떻게될까',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '휴닝카이',
      scrapStatus: false,
    },
    {
      itemId: 1,
      imgUrl: 'https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg',
      brandName: '피지컬 디파트먼트',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '권은비',
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
      <HomeTitle className='title'>한눈에 보는 취향 큐레이션</HomeTitle>
      <ItemListWrapper>
        <ItemListCol>
          <ItemCard
            imgUrl={itemList[0].imgUrl}
            celebName={itemList[0].celebName}
            itemId={itemList[0].itemId}
          ></ItemCard>
          <ItemCard
            imgUrl={itemList[1].imgUrl}
            celebName={itemList[1].celebName}
            itemId={itemList[1].itemId}
          ></ItemCard>
        </ItemListCol>
        <ItemListCol>
          <ItemCard
            imgUrl={itemList[0].imgUrl}
            celebName={itemList[0].celebName}
            itemId={itemList[0].itemId}
          ></ItemCard>
          <HeartCard>
            <HeartArrow></HeartArrow>
          </HeartCard>
        </ItemListCol>
        <ItemListCol>
          <ItemCard></ItemCard>
          <ItemCard
            imgUrl={itemList[1].imgUrl}
            celebName={itemList[1].celebName}
            itemId={itemList[1].itemId}
          ></ItemCard>
        </ItemListCol>
        <ItemListCol>
          <ItemCard
            imgUrl={itemList[0].imgUrl}
            celebName={itemList[0].celebName}
            itemId={itemList[0].itemId}
          ></ItemCard>
          <ItemCard
            imgUrl={itemList[1].imgUrl}
            celebName={itemList[1].celebName}
            itemId={itemList[1].itemId}
          ></ItemCard>
        </ItemListCol>
        <ItemListCol>
          <HeartCard>
            <HeartArrow></HeartArrow>
          </HeartCard>
          <ItemCard
            imgUrl={itemList[1].imgUrl}
            celebName={itemList[1].celebName}
            itemId={itemList[1].itemId}
          ></ItemCard>
        </ItemListCol>
        <ItemListCol>
          <ItemCard
            imgUrl={itemList[0].imgUrl}
            celebName={itemList[0].celebName}
            itemId={itemList[0].itemId}
          ></ItemCard>
          <ItemCard
            imgUrl={itemList[1].imgUrl}
            celebName={itemList[1].celebName}
            itemId={itemList[1].itemId}
          ></ItemCard>
        </ItemListCol>
        <ItemListCol>
          <ItemCard
            imgUrl={itemList[0].imgUrl}
            celebName={itemList[0].celebName}
            itemId={itemList[0].itemId}
          ></ItemCard>
          <ItemCard></ItemCard>
        </ItemListCol>
      </ItemListWrapper>
    </ScrollComponentWrapper>
  )
}

export default Curation

export const ItemListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 0 1.25rem;
  gap: 0.5625rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ItemListCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5625rem;
`
export const HeartCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  width: 6.25rem;
  height: 6.25rem;
  background: linear-gradient(180deg, rgba(255, 242, 242, 0) 35.42%, #fff2f2 100%);
`
