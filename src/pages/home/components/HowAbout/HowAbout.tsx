import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Line } from '../../../community/detail/styles'
import { Common, Pretendard } from '../../../../components/styles'

import { ReactComponent as StorageOff } from '../../../../assets/storage_off_24.svg'
import { ReactComponent as StorageOn } from '../../../../assets/storage_on_24.svg'

const HowAbout = () => {
  const navigate = useNavigate()

  const itemList = [
    {
      itemId: 35,
      imgUrl: 'https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg',
      brandName: '피지컬 디파트먼트라고하면어떻게될까',
      itemName: 'BROCCOLI FAMILY HOODIE GRAY',
      celebName: '휴닝카이',
      scrapStatus: true,
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
  ]
  return (
    <ScrollComponentWrapper>
      <HomeTitle className='title'>이 아이템은 어때요?</HomeTitle>
      <HowAboutList>
        {itemList.map((item, index) => {
          return (
            <>
              <HowAboutItem>
                <CirclePhoto imgUrl={item.imgUrl}></CirclePhoto>
                <ItemInfoWrapper>
                  <ItemName>{item.celebName}</ItemName>
                  <ItemText>{item.brandName}</ItemText>
                  <ItemText>{item.itemName}</ItemText>
                </ItemInfoWrapper>
                {item.scrapStatus ? <StorageOn /> : <StorageOff />}
              </HowAboutItem>
              {index !== itemList.length - 1 && <Line></Line>}
            </>
          )
        })}
      </HowAboutList>
    </ScrollComponentWrapper>
  )
}

export default HowAbout

export const HowAboutList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  gap: 1rem;
`

export const HowAboutItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CirclePhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.GR300};
`
export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.25rem;
`
export const ItemName = styled.span`
  margin-bottom: 0.375rem;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const ItemText = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
