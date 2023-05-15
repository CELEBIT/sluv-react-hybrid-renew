import React from 'react'
import Chip from '../../Chip/Chip'
import { TopBrandResult } from '../../../apis/brand/brandService'
import useModals from '../../Modals/hooks/useModals'
import { useRecoilState } from 'recoil'
import { modals } from '../../Modals'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { itemInfoState } from '../../../recoil/itemInfo'

interface HotBrandChipProps {
  hotBrandData: TopBrandResult
}

const HotBrandChip = ({ hotBrandData }: HotBrandChipProps) => {
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const { closeModal } = useModals()

  const {
    postRecentBrand: { mutate },
  } = useRecentBrandQuery()

  const onChipClick = (brand: TopBrandResult) => {
    mutate({
      brandId: brand.id,
      newBrandId: null,
    })
    setItemInfo({
      ...itemInfo,
      brand: {
        brandId: brand.id,
        brandName: brand.brandKr,
        brandImgUrl: brand.brandImgUrl,
      },
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
