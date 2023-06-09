import styled from '@emotion/styled'
import { Common } from '../../styles'
import React, { useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Brand } from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import BrandLogo from '../../BrandLogo/BrandLogo'
import useBrandSearchQuery from '../../../apis/brand/hooks/useBrandSearchQuery'

import { useObserver } from '../../../hooks/useObserver'
import { useDebounce } from 'use-debounce'
import HighlightedText from '../../HighlightedText/HighlightedText'
import { itemInfoState } from '../../../recoil/itemInfo'
import { brandNameSearchState } from '../../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import EmptyState from '../../EmptyState'
import HotItem from '../HotItem'
import { Divider } from '../../../pages/item/detail/styles'

const SearchResult = () => {
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const brandName = useRecoilValue(brandNameSearchState)
  const [debouncedBrandName] = useDebounce(brandName, 300)

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
    setItemInfo({
      ...itemInfo,
      brand: {
        brandId: brand.id,
        brandName: brand.brandKr,
        brandImgUrl: brand.brandImgUrl,
      },
      newBrand: null,
    })
  }
  return (
    <SearchResultWrapper>
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
                      text={brand.brandEn}
                      fontSize={0.9375}
                      fontWeight={Common.bold.thin}
                    ></HighlightedText>
                  </TextWrap>
                  <BrandLogo size={46} url={brand.brandImgUrl} />
                </EachBrand>
              )
            })
          ) : (
            <div className='full' key={index}>
              <EmptyState
                icon='search'
                title='검색 결과가 없어요'
                subtitle={`다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요`}
              ></EmptyState>
              <Divider className='full'></Divider>
              <HotItem></HotItem>
            </div>
          ),
        )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage ? (
        <div className='spinner'>
          <div>Loading</div>
        </div>
      ) : null}
    </SearchResultWrapper>
  )
}

export default SearchResult

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  padding-top: 1rem;
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  .full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
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
