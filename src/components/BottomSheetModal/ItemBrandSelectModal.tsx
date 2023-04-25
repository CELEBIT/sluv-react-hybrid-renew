import React, { useState } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
// import useModals from '../Modals/hooks/useModals'
// import { modals } from '../Modals'
import SearchTextfield from '../TextField/SearchTextfield/SearchTextfield'
import HotBrand from './ItemBrandSelectModalComponent/HotBrand'
import RecentSearch from './ItemBrandSelectModalComponent/RecentSelectBrand'
import BrandList from './ItemBrandSelectModalComponent/BrandList'
import Header from '../Header/Header'

const ItemBrandSelectModal = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  // const { closeModal } = useModals()

  // const onClose = () => {
  //   closeModal(modals.ItemDatePickerModal)
  //   console.log('close modal in itembrand select modal')
  // }
  const onSearch = () => {
    console.log('검색')
  }
  const success = true

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header title='브랜드 검색' isModalHeader={true} />
        </div>
        <SearchWrapper>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            onEnter={onSearch}
            placeholder='브랜드를 검색해주세요'
          ></SearchTextfield>
        </SearchWrapper>
        {/* 입력내용 없을 시 */}
        {searchValue === '' ? (
          <div className='long'>
            <RecentSearch></RecentSearch>
            <HotBrand></HotBrand>
          </div>
        ) : (
          // 입력내용 존재
          <div className='long'>{success ? <BrandList></BrandList> : <>없는 브랜드</>}</div>
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
  .Header {
    padding: 0 1.25rem;
  }
  .long {
    height: 34.875rem;
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
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  gap: 0.5rem;
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
