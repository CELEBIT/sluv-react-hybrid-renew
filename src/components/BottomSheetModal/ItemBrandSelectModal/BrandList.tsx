import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import {
  Brand,
  selectedBrandState,
} from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import BrandLogo from '../../BrandLogo/BrandLogo'

const BrandList = () => {
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

  const onSelectBrand = (brand: Brand) => {
    setBrand(brand)
    closeModal(modals.ItemBrandSelectModal)
  }

  return (
    <BrandListWrapper>
      {brandList.map((brand) => {
        return (
          <EachBrand key={brand.id} onClick={() => onSelectBrand(brand)}>
            <TextWrap>
              <BrandKR>{brand.brandKr}</BrandKR>
              <BrandEN>{brand.brandEn}</BrandEN>
            </TextWrap>
            <BrandLogo size={46} url={brand.brandImgUrl} />
          </EachBrand>
        )
      })}
    </BrandListWrapper>
  )
}

export default BrandList

const BrandListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 1rem;
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  overflow-y: scroll;
`
const EachBrand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 0 0.875rem 0.75rem;
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const BrandKR = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
const BrandEN = styled.span`
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: 0.9375rem;
  color: ${Common.colors.GR500};
  margin-top: 0.25rem;
`
