import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal'
import {
  Brand,
  selectedBrandState,
} from '../../../pages/item/create/component/BrandItemField/BrandItemField'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

const HotBrand = () => {
  const chipList = [
    {
      id: 0,
      brandKr: '무신사1',
      brandEn: '무신사',
      brandImgUrl: 'string',
    },
    {
      id: 1,
      brandKr: '에잇세컨즈1',
      brandEn: '에잇세컨즈',
      brandImgUrl: 'string',
    },
    {
      id: 2,
      brandKr: '플랙1',
      brandEn: '플랙',
      brandImgUrl: 'string',
    },
    {
      id: 3,
      brandKr: '루이비통1',
      brandEn: '루이비통',
      brandImgUrl: 'string',
    },
    {
      id: 4,
      brandKr: '샤넬1',
      brandEn: '샤넬',
      brandImgUrl: 'string',
    },
    {
      id: 5,
      brandKr: '프로젝트엠1',
      brandEn: '프로젝트엠',
      brandImgUrl: 'string',
    },
    {
      id: 6,
      brandKr: '나이키1',
      brandEn: '나이키',
      brandImgUrl: 'string',
    },
    {
      id: 7,
      brandKr: '아디다스1',
      brandEn: '아디다스',
      brandImgUrl: 'string',
    },
    {
      id: 8,
      brandKr: '뉴발란스1',
      brandEn: '뉴발란스',
      brandImgUrl: 'string',
    },
  ]
  const setBrand = useSetRecoilState(selectedBrandState)
  const { closeModal } = useModals()

  const onChipClick = (brand: Brand) => {
    setBrand(brand)
    closeModal(modals.ItemBrandSelectModal)
  }

  return (
    <HotBrandWrapper>
      <span>인기 브랜드</span>
      <ChipWrapper>
        {chipList.map((brand) => {
          return (
            <Chip key={brand.id} text={brand.brandKr} onClick={() => onChipClick(brand)}></Chip>
          )
        })}
      </ChipWrapper>
    </HotBrandWrapper>
  )
}

export default HotBrand

const HotBrandWrapper = styled.div`
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
