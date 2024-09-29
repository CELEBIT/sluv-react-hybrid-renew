import React from 'react'
import styled from '@emotion/styled'
import Photo from '../AddPhotos/Photo'
import { Common, Pretendard } from '../styles'

export interface IItem {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  size?: number
  onClick: any
  borderRadius: number
  scrapStatus?: boolean
  isSelected?: boolean
  isPreview?: boolean
}

const Item = ({
  itemId,
  itemName,
  imgUrl,
  brandName,
  celebName,
  scrapStatus,
  size,
  onClick,
  borderRadius,
  isSelected,
  isPreview,
}: IItem) => {
  return (
    <RecommendItemWrapper key={itemId} size={size} onClick={() => onClick()}>
      <Photo
        itemId={itemId}
        size={size}
        borderRadius={borderRadius}
        imgUrl={imgUrl}
        storageFlag={scrapStatus}
        isSelected={isSelected}
        isPreview={isPreview}
      ></Photo>
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

const RecommendItemWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.625rem;
  width: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
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
  white-space: pre-wrap;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`
const Name = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${Pretendard({ size: 14, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
