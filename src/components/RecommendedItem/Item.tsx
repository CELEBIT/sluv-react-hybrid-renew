import React from 'react'
import styled from '@emotion/styled'
import Photo from '../AddPhotos/Photo'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'

export interface IItem {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus?: boolean
}

const Item = ({ itemId, itemName, imgUrl, brandName, celebName, scrapStatus }: IItem) => {
  const navigate = useNavigate()
  return (
    <RecommendItemWrapper key={itemId} onClick={() => navigate(`/item/detail/${itemId}`)}>
      <Photo size={150} borderRadius={12} imgUrl={imgUrl} storageFlag={scrapStatus}></Photo>
      <div className='infoText'>
        <CelebName>{celebName}</CelebName>
        <div className='itemInfoText'>
          <Name>{brandName}</Name>
          <Name>{itemName}</Name>
        </div>
      </div>
    </RecommendItemWrapper>
  )
}

export default Item

const RecommendItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 9.375rem;
  .infoText {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .itemInfoText {
      display: flex;
      flex-direction: column;
    }
  }
`

const CelebName = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`
const Name = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${Pretendard({ size: 14, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
