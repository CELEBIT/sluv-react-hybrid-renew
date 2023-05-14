import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import React, { useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  Brand,
  selectedBrandState,
} from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import BrandLogo from '../../BrandLogo/BrandLogo'
import useBrandSearchQuery from '../../../apis/brand/hooks/useBrandSearchQuery'
import { brandNameSearchState } from './ItemBrandSelectModal'
import { useObserver } from '../../../hooks/useObserver'
import { useDebounce } from 'use-debounce'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import HighlightedText from '../../HighlightedText/HighlightedText'
import useNewBrandQuery from '../../../apis/brand/hooks/useNewBrandQuery'

const BrandList = () => {
  const setBrand = useSetRecoilState(selectedBrandState)
  const brandName = useRecoilValue(brandNameSearchState)
  const [debouncedBrandName] = useDebounce(brandName, 300)

  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
  } = useRecentBrandQuery()
  const {
    postNewBrand: { mutate: mutateByPostNewBrand },
  } = useNewBrandQuery()
  const { searchBrand } = useBrandSearchQuery()
  const { data, error, fetchNextPage, status, isFetching, isFetchingNextPage } =
    searchBrand(debouncedBrandName)
  const bottom = useRef(null)

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()
  useObserver({
    target: bottom,
    onIntersect,
  })

  const onSelectBrand = (brand: Brand) => {
    mutateByPostRecentBrand({
      brandId: brand.id ?? null,
      newBrandId: null,
    })
    setBrand(brand)
  }
  console.log('브랜드 무한스크롤', data)

  const onSelectNewBrand = async (newBrandName: string) => {
    mutateByPostNewBrand({
      newBrandName,
    })
  }

  return (
    <BrandListWrapper>
      {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
      {status === 'success' &&
        data?.pages.map((item, index) =>
          item.content.length > 0 ? (
            item.content.map((brand) => {
              return (
                <EachBrand key={brand.id} onClick={() => onSelectBrand(brand)}>
                  <TextWrap>
                    <BrandKR>{brand.brandKr}</BrandKR>
                    <BrandEN>{brand.brandEn}</BrandEN>
                  </TextWrap>
                  <BrandLogo size={46} url={brand.brandImgUrl} />
                </EachBrand>
              )
            })
          ) : (
            <EachBrand key={index} onClick={() => onSelectNewBrand(debouncedBrandName)}>
              <HighlightedText
                searchText={debouncedBrandName}
                text={debouncedBrandName}
                fontSize={1.125}
                fontWeight={Common.bold.regular}
              />
            </EachBrand>
          ),
        )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <div className='spinner'>
          <div>Loading</div>
        </div>
      ) : null}
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
