import React from 'react'
import Chip from '../../Chip/Chip'
import { TopBrandResult } from '../../../apis/brand/brandService'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import {
  createItemBrandState,
  createItemNewBrandState,
  itemInfoState,
} from '../../../recoil/itemInfo'

interface HotBrandChipProps {
  hotBrandData: TopBrandResult
}

const HotBrandChip = ({ hotBrandData }: HotBrandChipProps) => {
  const setBrand = useSetRecoilState(createItemBrandState)
  const resetNewBrand = useResetRecoilState(createItemNewBrandState)

  const {
    postRecentBrand: { mutate },
  } = useRecentBrandQuery()

  const onChipClick = (brand: TopBrandResult) => {
    mutate({
      brandId: brand.id,
      newBrandId: null,
    })
    setBrand({
      brandId: brand.id,
      brandName: brand.brandKr,
      brandImgUrl: brand.brandImgUrl,
    })
    resetNewBrand()
  }

  return (
    <Chip
      key={hotBrandData.id}
      text={hotBrandData.brandKr}
      onClick={() => onChipClick(hotBrandData)}
    />
  )
}

export default HotBrandChip
