import React from 'react'
import { useRecoilValue } from 'recoil'
import DisplayField from '../../../../../components/TextField/DisplayField/DisplayField'
import { Common, Pretendard } from '../../../../../components/styles'
import styled from '@emotion/styled'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import BrandLogo from '../../../../../components/BrandLogo/BrandLogo'
import { BrandFlag } from '../../../../../apis/core/type'
import { itemInfoState } from '../../../../../recoil/itemInfo'
interface BrandItemFieldProps {
  brandValid: boolean
  itemNameValid: boolean
}
export interface Brand {
  id?: number
  brandKr?: string
  brandEn?: string
  brandImgUrl?: string
  flag?: BrandFlag
}

const BrandItemField = ({ brandValid, itemNameValid }: BrandItemFieldProps) => {
  const { openModal } = useModals()
  const itemInfo = useRecoilValue(itemInfoState)
  // 날짜 선택 모달
  const onBrandSelect = () => {
    openModal(modals.ItemBrandSelectModal)
  }
  const onItemNameSelect = () => {
    console.log('아이템 모달 열기')
    openModal(modals.ItemNameInputModal)
  }
  const brandErrorMsg = '필수 항목입니다'
  const itemErrorMsg = '상품명은 필수 항목입니다'
  if (!itemInfo.brand?.brandId && !itemInfo.newBrand?.brandId && !itemInfo.itemName) {
    return (
      <DisplayField valid={brandValid} errorMsg={brandErrorMsg}>
        <PlaceHolder onClick={onBrandSelect}>브랜드를 검색해주세요</PlaceHolder>
      </DisplayField>
    )
  } else if ((itemInfo.brand?.brandId || itemInfo.newBrand?.brandId) && !itemInfo.itemName) {
    return (
      <DisplayField valid={itemNameValid} errorMsg={itemErrorMsg}>
        <Brand onClick={onBrandSelect}>
          <BrandLogo
            size={32}
            url={itemInfo.newBrand?.brandId ? '' : itemInfo.brand?.brandImgUrl}
          />
          <span>
            {itemInfo.newBrand?.brandId ? itemInfo.newBrand.brandName : itemInfo.brand?.brandName}
          </span>
        </Brand>
        <PlaceHolder onClick={onItemNameSelect}>상품명 예) PRODUCT 123</PlaceHolder>
      </DisplayField>
    )
  } else {
    return (
      <DisplayField>
        <Brand onClick={onBrandSelect}>
          <BrandLogo
            size={32}
            url={!itemInfo.newBrand?.brandId ? '' : itemInfo.brand?.brandImgUrl}
          />
          <span>
            {itemInfo.newBrand?.brandId ? itemInfo.newBrand.brandName : itemInfo.brand?.brandName}
          </span>
        </Brand>
        <span onClick={onItemNameSelect}>{itemInfo.itemName}</span>
      </DisplayField>
    )
  }
}

export default BrandItemField

const PlaceHolder = styled.span`
  font-family: Pretendard;
  font-size: 1.0625rem;
  font-weight: 400;
  color: ${Common.colors.GR500} !important;
`

export const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  span {
    margin-left: 0.5rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`
