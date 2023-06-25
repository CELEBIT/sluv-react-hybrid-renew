import React from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'
import { IselectedItem } from '../../../../../../recoil/communityInfo'
import { ReactComponent as Delete } from '../../../../../../assets/delete_textfield_24.svg'

interface ExistingItemProps {
  item: IselectedItem
  className?: string
  onDelete: any
}

const ExistingItem = ({ item, className, onDelete }: ExistingItemProps) => {
  // 스럽에 존재하는 아이템
  return (
    <ImageField imgUrl={item.imgUrl} className={className} dim={true}>
      <Delete className='delete' onClick={onDelete}></Delete>
      <ItemInfoWrapper>
        <CelebName>{item.celebName}</CelebName>
        <BrandName>{item.brandName}</BrandName>
        <ItemName>{item.itemName}</ItemName>
      </ItemInfoWrapper>
    </ImageField>
  )
}

export const ImageField = styled.div<{ imgUrl: string | null | undefined; dim?: boolean }>`
  display: flex;
  position: relative;
  align-items: flex-end;
  width: 50%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;

  background-image: ${(props) =>
      props.dim
        ? 'linear-gradient(360deg, rgba(0, 0, 0, 0.5) 0.45%, rgba(0, 0, 0, 0) 76.51%),'
        : ''}
    url(${(props) => props.imgUrl});
  padding: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  .delete {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    transform: translate(50%, -50%);
  }
`

export const ItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

export const CelebName = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.semiBold, color: 'white' })}
  white-space: pre-wrap;
`
export const BrandName = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: 'white' })}
  text-overflow: ellipsis;
  overflow: hidden;
`
export const ItemName = styled.span`
  ${Pretendard({ size: 12, weight: Common.bold.thin, color: 'white' })}
  text-overflow: ellipsis;
  overflow: hidden;
`

export default ExistingItem
