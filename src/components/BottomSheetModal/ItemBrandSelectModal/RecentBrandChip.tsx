import React from 'react'
import Chip from '../../Chip/Chip'
import { RecentBrandResult } from '../../../apis/brand/brandService'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { BrandFlag } from '../../../apis/core/type'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'

export interface RecentBrandChipProps {
  brandData: RecentBrandResult
}

const RecentBrandChip = ({ brandData }: RecentBrandChipProps) => {
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
    deleteRecentBrand: { mutate: mutateByDeleteRecentBrand },
  } = useRecentBrandQuery()

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

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
      setItemInfo({
        ...itemInfo,
        brand: {
          brandId: brand.id,
          brandName: brand.brandName,
          brandImgUrl: brandData.brandImgUrl,
        },
        newBrand: null,
      })
    } else {
      // New 브랜드
      setItemInfo({
        ...itemInfo,
        newBrand: {
          brandId: brand.id,
          brandName: brand.brandName,
          brandImgUrl: '',
        },
        brand: null,
      })
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
