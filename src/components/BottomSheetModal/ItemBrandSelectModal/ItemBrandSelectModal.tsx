import React from 'react'
import BottomSheetModal from '..'
import styled from '@emotion/styled'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import SearchTextfield from '../../TextField/SearchTextfield/SearchTextfield'
import HotBrand from './HotBrand'
import RecentSearch from './RecentSelectBrand'
import BrandList from './BrandList'
import Header from '../../Header/Header'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'

export const brandNameSearchState = atom<string>({
  key: atomKeys.brandNameSearchState,
  default: '',
})

const ItemBrandSelectModal = () => {
  const [searchValue, setSearchValue] = useRecoilState<string>(brandNameSearchState)
  const { closeModal } = useModals()

  const {
    getBrandRecentSelected: { data: recentBrandData },
  } = useRecentBrandQuery()

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header
            title='브랜드 검색'
            isModalHeader={true}
            modalCloseBtnClick={() => closeModal(modals.ItemBrandSelectModal)}
          />
        </div>
        <SearchWrapper>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            placeholder='브랜드를 검색해주세요'
          ></SearchTextfield>
        </SearchWrapper>
        {/* 입력내용 없을 시 */}
        {searchValue === '' ? (
          <div className='long'>
            {(recentBrandData?.length ?? 0) > 0 && (
              <RecentSearch data={recentBrandData}></RecentSearch>
            )}
            <HotBrand></HotBrand>
          </div>
        ) : (
          // 입력내용 존재
          <div className='long'>
            <BrandList />
          </div>
        )}
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemBrandSelectModal

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .Header {
    padding: 0 1.25rem;
  }
  .long {
    height: 70vh !important;
  }
`
const SearchWrapper = styled.div`
  width: 100%;
  padding: 0 20px 0 20px;
`
export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.5rem 0 0 1.25rem;
  width: 100%;
  /* margin-left: calc(-50vw + 50%); */
  gap: 0.5rem;
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
