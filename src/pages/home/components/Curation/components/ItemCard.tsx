import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../../../components/styles'
import { useNavigate } from 'react-router-dom'

interface ItemCardProps {
  imgUrl?: string
  celebName?: string
  itemId?: number
}

const ItemCard = ({ imgUrl, celebName, itemId }: ItemCardProps) => {
  const navigate = useNavigate()
  if (itemId)
    return (
      <ItemCardWrapper imgUrl={imgUrl} onClick={() => navigate(`/item/detail/${itemId}`)}>
        {imgUrl && <ItemCardDim></ItemCardDim>}
        <ItemCardName>{celebName}</ItemCardName>
      </ItemCardWrapper>
    )
  else {
    return <ItemCardWrapper></ItemCardWrapper>
  }
}

export default ItemCard

export const ItemCardWrapper = styled.div<{ imgUrl?: string }>`
  display: flex;
  /* justify-content: flex-end;  */
  align-items: flex-end;
  position: relative;
  flex-shrink: 0;
  width: 6.25rem;
  height: 8.25rem;
  padding: 0.75rem;
  overflow: hidden;
  background: ${(props) =>
    props.imgUrl
      ? `url(${props.imgUrl})`
      : 'linear-gradient(180deg, #FEFFB9 0%, rgba(174, 253, 173, 0.69) 39.84%, #B6E9FF 100%)'};
  border-radius: 0.5rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`
export const ItemCardDim = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4000000059604645;
  background: linear-gradient(360deg, #212529 0%, rgba(33, 37, 41, 0) 100%);
`

export const ItemCardName = styled.span`
  z-index: 5;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.WH })}
`
