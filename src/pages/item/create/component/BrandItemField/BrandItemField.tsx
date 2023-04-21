import React from 'react'
import { atom, useRecoilValue } from 'recoil'
import DisplayField from '../../../../../components/TextField/DisplayField/DisplayField'
import { Common } from '../../../../../components/styles'
import styled from '@emotion/styled'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import BrandLogo from '../../../../../components/BrandLogo/BrandLogo'

export interface Brand {
  id?: number
  brandKr?: string
  brandEn?: string
  brandImgUrl?: string
}

export const selectedBrandState = atom<Brand>({
  key: 'selectedBrand',
  default: {},
})

export const itemNameState = atom<string>({
  key: 'itemName',
  default: '',
})

interface BrandItemFieldProps {
  brandValid: boolean
  itemNameValid: boolean
}

const BrandItemField = ({ brandValid, itemNameValid }: BrandItemFieldProps) => {
  const { openModal } = useModals()
  const brand = useRecoilValue(selectedBrandState)
  const itemName = useRecoilValue(itemNameState)
  // 날짜 선택 모달
  const onBrandSelect = () => {
    openModal(modals.ItemBrandSelectModal)
  }
  const onItemNameSelect = () => {
    openModal(modals.ItemNameInputModal)
  }
  const brandErrorMsg = '필수 항목입니다'
  const itemErrorMsg = '상품명은 필수 항목입니다'
  if (!brand.id && !itemName) {
    return (
      <DisplayField valid={brandValid} errorMsg={brandErrorMsg}>
        <PlaceHolder onClick={onBrandSelect}>브랜드를 검색해주세요</PlaceHolder>
      </DisplayField>
    )
  } else if (!itemName) {
    return (
      <DisplayField valid={itemNameValid} errorMsg={itemErrorMsg}>
        <Brand onClick={onBrandSelect}>
          <BrandLogo size={32} url={brand.brandImgUrl} />
          <span>{brand.brandKr}</span>
        </Brand>
        <PlaceHolder onClick={onItemNameSelect}>상품명 예) PRODUCT 123</PlaceHolder>
      </DisplayField>
    )
  } else {
    return (
      <DisplayField>
        <Brand onClick={onBrandSelect}>
          <BrandLogo size={32} url={brand.brandImgUrl} />
          <span>{brand.brandKr}</span>
        </Brand>
        <span onClick={onItemNameSelect}>{itemName}</span>
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

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin-left: 0.5rem;
  }
`
