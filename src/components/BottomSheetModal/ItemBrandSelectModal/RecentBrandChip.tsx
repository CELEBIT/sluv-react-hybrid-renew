import React from 'react'
import Chip from '../../Chip/Chip'
import { RecentBrandResult } from '../../../apis/brand/brandService'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { BrandFlag } from '../../../apis/core/type'
import { useSetRecoilState } from 'recoil'
import { selectedBrandState } from '../../../pages/item/create/components/BrandItemField/BrandItemField'

export interface RecentBrandChipProps {
  brandData: RecentBrandResult
}

const RecentBrandChip = ({ brandData }: RecentBrandChipProps) => {
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
    deleteRecentBrand: { mutate: mutateByDeleteRecentBrand },
  } = useRecentBrandQuery()

  const setBrand = useSetRecoilState(selectedBrandState)

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
    setBrand({
      id: brand.id,
      brandKr: brand.brandName,
      flag: brand.flag as BrandFlag,
    })
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
