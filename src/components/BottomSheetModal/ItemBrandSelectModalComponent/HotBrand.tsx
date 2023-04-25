import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal'
import {
  Brand,
  selectedBrandState,
} from '../../../pages/item/create/component/BrandItemField/BrandItemField'

const HotBrand = () => {
  const brandList = [
    {
      id: 1,
      brandKr: '피지컬 에듀케이션 디파트먼트',
      brandEn: 'Physical Education Department',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/physicaleducation.png?202304121128',
    },
    {
      id: 2,
      brandKr: '반스',
      brandEn: 'Vans',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/vans.png?202304181156',
    },
    {
      id: 3,
      brandKr: '무신사 스탠다드',
      brandEn: ' Musinsa Standard',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/musinsastandard.png?202304201136',
    },
    {
      id: 4,
      brandKr: '플랙',
      brandEn: 'Plac',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/plac.png?202303131417',
    },
    {
      id: 5,
      brandKr: '피지컬 에듀케이션 디파트먼트',
      brandEn: 'Physical Education Department',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/physicaleducation.png?202304121128',
    },
    {
      id: 6,
      brandKr: '반스',
      brandEn: 'Vans',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/vans.png?202304181156',
    },
    {
      id: 7,
      brandKr: '무신사 스탠다드',
      brandEn: ' Musinsa Standard',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/musinsastandard.png?202304201136',
    },
    {
      id: 8,
      brandKr: '플랙',
      brandEn: 'Plac',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/plac.png?202303131417',
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
        {brandList.map((brand) => {
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
