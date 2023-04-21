import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import { selectedBrandState } from '../../../pages/item/create/component/BrandItemField/BrandItemField'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

const BrandList = () => {
  const brandList = [
    {
      id: 0,
      brandKr: '피지컬 에듀케이션 디파트먼트',
      brandEn: 'Physical Education Department',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/physicaleducation.png?202304121128',
    },
    {
      id: 1,
      brandKr: '반스',
      brandEn: 'Vans',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/vans.png?202304181156',
    },
    {
      id: 2,
      brandKr: '무신사 스탠다드',
      brandEn: ' Musinsa Standard',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/musinsastandard.png?202304201136',
    },
    {
      id: 3,
      brandKr: '플랙',
      brandEn: 'Plac',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/plac.png?202303131417',
    },
    {
      id: 4,
      brandKr: '피지컬 에듀케이션 디파트먼트',
      brandEn: 'Physical Education Department',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/physicaleducation.png?202304121128',
    },
    {
      id: 5,
      brandKr: '반스',
      brandEn: 'Vans',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/vans.png?202304181156',
    },
    {
      id: 6,
      brandKr: '무신사 스탠다드',
      brandEn: ' Musinsa Standard',
      brandImgUrl:
        'https://image.msscdn.net/mfile_s01/_brand/free_medium/musinsastandard.png?202304201136',
    },
    {
      id: 7,
      brandKr: '플랙',
      brandEn: 'Plac',
      brandImgUrl: 'https://image.msscdn.net/mfile_s01/_brand/free_medium/plac.png?202303131417',
    },
  ]
  const setBrand = useSetRecoilState(selectedBrandState)
  const { closeModal } = useModals()

  const onSelectBrand = (chipText: string) => {
    setBrand(chipText)
    closeModal(modals.ItemBrandSelectModal)
  }

  return (
    <BrandListWrapper>
      {brandList.map((brand) => {
        return (
          <Brand key={brand.id} onClick={() => onSelectBrand(brand.brandKr)}>
            <TextWrap>
              <BrandKR>{brand.brandKr}</BrandKR>
              <BrandEN>{brand.brandEn}</BrandEN>
            </TextWrap>
            <Logo url={brand.brandImgUrl} />
          </Brand>
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
  margin-top: 1rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
  overflow-y: scroll;
`
const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  width: 100%;
  padding: 0.875rem 0 0.875rem 0;
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const BrandKR = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
const BrandEN = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
const Logo = styled.div<{ url: string }>`
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  border: 1px solid ${Common.colors.GR200};
  background-image: url(${(props) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-size: 70%;
`
