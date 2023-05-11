import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from './ItemBrandSelectModal'
import {
  Brand,
  selectedBrandState,
} from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import useTopBrandQuery from '../../../apis/brand/hooks/useTopBrandQuery'

const HotBrand = () => {
  const {
    getTopBrand: { data },
  } = useTopBrandQuery()
  console.log('인기 브랜드', data)

  const setBrand = useSetRecoilState(selectedBrandState)
  const { closeModal } = useModals()

  const onChipClick = (brand: Brand) => {
    setBrand(brand)
    closeModal(modals.ItemBrandSelectModal)
  }

  return (
    <HotWrapper>
      <span>인기 브랜드</span>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((brand) => {
            return (
              <Chip key={brand.id} text={brand.brandKr} onClick={() => onChipClick(brand)}></Chip>
            )
          })}
      </ChipWrapper>
    </HotWrapper>
  )
}

export default HotBrand

export const HotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`
