import styled from '@emotion/styled'
import { Common } from '../../styles'
import React, { useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Brand } from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import BrandLogo from '../../BrandLogo/BrandLogo'
import useBrandSearchQuery from '../../../apis/brand/hooks/useBrandSearchQuery'
import { brandNameSearchState } from './ItemBrandSelectModal'
import { useObserver } from '../../../hooks/useObserver'
import { useDebounce } from 'use-debounce'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import HighlightedText from '../../HighlightedText/HighlightedText'
import useNewBrandQuery from '../../../apis/brand/hooks/useNewBrandQuery'
import {
  createItemBrandState,
  createItemNewBrandState,
  itemInfoState,
} from '../../../recoil/itemInfo'

const BrandList = () => {
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const setBrand = useSetRecoilState(createItemBrandState)
  const setNewBrand = useSetRecoilState(createItemNewBrandState)

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
    setBrand({
      brandId: brand.id ?? 0,
      brandName: brand.brandKr ?? '',
      brandImgUrl: brand.brandImgUrl,
    })
  }

  const onSelectNewBrand = async (newBrandName: string) => {
    mutateByPostNewBrand({
      newBrandName,
    })
  }

  function capitalizeEachWord(str: string) {
    // 모든 문자를 소문자로 변경 후, 단어 단위로 분리
    const words = str.toLowerCase().split(' ')

    // 각 단어의 첫 글자를 대문자로 변경
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }

    // 단어들을 다시 합쳐서 반환
    return words.join(' ')
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
                    <HighlightedText
                      searchText={brandName}
                      text={brand.brandKr}
                      fontSize={1.125}
                      fontWeight={Common.bold.regular}
                    ></HighlightedText>
                    <HighlightedText
                      searchText={brandName}
                      text={capitalizeEachWord(brand.brandEn)}
                      fontSize={0.9375}
                      fontWeight={Common.bold.thin}
                      disabled={true}
                    ></HighlightedText>
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
