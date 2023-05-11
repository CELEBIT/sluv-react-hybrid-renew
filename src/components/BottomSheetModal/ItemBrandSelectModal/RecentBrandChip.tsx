import React from 'react'
import Chip from '../../Chip/Chip'
import { RecentBrandResult } from '../../../apis/brand/brandService'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { BrandFlag } from '../../../apis/core/type'

export interface RecentBrandChipProps {
  brandData: RecentBrandResult
  onClick: () => void
}

const RecentBrandChip = ({ brandData, onClick }: RecentBrandChipProps) => {
  const {
    deleteRecentBrand: { mutate },
  } = useRecentBrandQuery()

  const onDeleteRecentBrandChip = () => {
    mutate({
      brandId: brandData.id,
      flag: brandData.flag as BrandFlag,
    })
  }

  return (
    <Chip
      key={brandData.id}
      text={brandData.brandName}
      onClick={onClick}
      canDelete={true}
      onDelete={onDeleteRecentBrandChip}
    ></Chip>
  )
}

export default RecentBrandChip
