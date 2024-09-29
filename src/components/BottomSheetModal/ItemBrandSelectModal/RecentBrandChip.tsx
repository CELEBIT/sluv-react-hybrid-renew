import React from 'react'
import Chip from '../../Chip/Chip'
import { RecentBrandResult } from '../../../apis/brand/brandService'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { BrandFlag } from '../../../apis/core/type'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  createItemBrandState,
  createItemNewBrandState,
  itemInfoState,
} from '../../../recoil/itemInfo'

export interface RecentBrandChipProps {
  brandData: RecentBrandResult
}

const RecentBrandChip = ({ brandData }: RecentBrandChipProps) => {
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
    deleteRecentBrand: { mutate: mutateByDeleteRecentBrand },
  } = useRecentBrandQuery()

  const setBrand = useSetRecoilState(createItemBrandState)
  const resetBrand = useResetRecoilState(createItemBrandState)

  const setNewBrand = useSetRecoilState(createItemNewBrandState)
  const resetNewBrand = useResetRecoilState(createItemNewBrandState)

  const onDeleteRecentBrandChip = () => {
    mutateByDeleteRecentBrand({
      brandId: brandData.id,
      flag: brandData.flag as BrandFlag,
    })
  }

  const onChipClick = (brand: RecentBrandResult) => {
    mutateByPostRecentBrand({
      brandId: brand.flag === 'Y' ? brand.id : null,
      newBrandId: brand.flag === 'N' ? brand.id : null,
    })
    if (brand.flag === 'Y') {
      // 등록된 브랜드
      setBrand({
        brandId: brand.id,
        brandName: brand.brandName,
        brandImgUrl: brandData.brandImgUrl,
      })
      resetNewBrand()
    } else {
      // New 브랜드
      setNewBrand({
        brandId: brand.id,
        brandName: brand.brandName,
      })
      resetBrand()
    }
  }

  return (
    <Chip
      key={brandData.id}
      text={brandData.brandName}
      canDelete={true}
      onDelete={onDeleteRecentBrandChip}
      onClick={() => onChipClick(brandData)}
    />
  )
}

export default RecentBrandChip
