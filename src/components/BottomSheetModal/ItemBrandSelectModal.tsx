import React, { useState } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import SearchTextfield from '../TextField/SearchTextfield/SearchTextfield'
import HotBrand from './ItemBrandSelectModal/HotBrand'
import RecentSearch from './ItemBrandSelectModal/RecentSearch'
import BrandList from './ItemBrandSelectModal/BrandList'

const ItemBrandSelectModal = () => {
  const [searchValue, setSearchValue] = useState('')
  const { closeModal } = useModals()

  const onClose = () => {
    closeModal(modals.ItemDatePickerModal)
  }
  const onSearch = () => {
    console.log('검색')
  }
  const success = true

  return (
    <BottomSheetModal>
      <button onClick={onClose}>닫기</button>
      <ModalWrapper>
        <SearchWrapper>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            onEnter={onSearch}
            placeholder='브랜드를 검색해주세요'
          ></SearchTextfield>
        </SearchWrapper>

        {/* 입력내용 없을 시 */}
        {!searchValue ? (
          <>
            <RecentSearch></RecentSearch>
            <HotBrand></HotBrand>
          </>
        ) : (
          // 입력내용 존재
          <>{success ? <BrandList></BrandList> : <>없는 브랜드</>}</>
        )}
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemBrandSelectModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 0.75rem;
`
const SearchWrapper = styled.div`
  width: 100%;
  padding: 0 1.25rem;
`
export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.5rem 0 0 1.25rem;
  gap: 0.5rem;
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
