import React from 'react'
import Chip from '../../Chip/Chip'
import { TopBrandResult } from '../../../apis/brand/brandService'
import useModals from '../../Modals/hooks/useModals'
import { useSetRecoilState } from 'recoil'
import { selectedBrandState } from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import { modals } from '../../Modals'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'

interface HotBrandChipProps {
  hotBrandData: TopBrandResult
}

const HotBrandChip = ({ hotBrandData }: HotBrandChipProps) => {
  const setBrand = useSetRecoilState(selectedBrandState)
  const { closeModal } = useModals()

  const {
    postRecentBrand: { mutate },
  } = useRecentBrandQuery()

  const onChipClick = (brand: TopBrandResult) => {
    mutate({
      brandId: brand.id,
      newBrandId: null,
    })
    setBrand({
      id: brand.id,
      brandKr: brand.brandKr,
      brandEn: brand.brandEn,
      brandImgUrl: brand.brandImgUrl,
    })
    closeModal(modals.ItemBrandSelectModal)
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
