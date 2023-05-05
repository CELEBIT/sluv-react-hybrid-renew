import React, { useState, useRef } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import SearchTextfield from '../TextField/SearchTextfield/SearchTextfield'
import BrandList from './ItemBrandSelectModalComponent/BrandList'
import Header from '../Header/Header'
import HotCeleb from './ItemCelebSearchModalComponent/HotCeleb'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { selectedCelebState } from '../SelectCeleb/SelectCeleb'
import { useRecoilState } from 'recoil'
import MyCeleb from './ItemCelebSearchModalComponent/MyCeleb'

const ItemCelebSearchModal = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const { closeModal } = useModals()
  const defaultRef = useRef<HTMLDivElement>(null)
  const myCelebRef = useRef<HTMLDivElement>(null)

  const onSearch = () => {
    console.log('검색')
  }
  const success = true

  const onClose = () => {
    setSelectedCeleb(0)
    closeModal(modals.ItemCategoryModal)
  }
  const onComplete = () => {
    console.log(selectedCeleb)
    closeModal(modals.ItemCategoryModal)
  }

  //   useEffect(() => {
  //     if (defaultRef.current && myCelebRef.current) {
  //       defaultRef.current.addEventListener('scroll', handleScroll)
  //     }
  //     return () => {
  //       if (defaultRef.current && myCelebRef.current) {
  //         defaultRef.current.removeEventListener('scroll', handleScroll)
  //       }
  //     }
  //   }, [defaultRef, myCelebRef])

  //   const handleScroll = () => {
  //     if (defaultRef.current && myCelebRef.current) {
  //       if (
  //         myCelebRef.current.offsetTop <=
  //         defaultRef.current.scrollTop + defaultRef.current.scrollTop
  //       ) {
  //         defaultRef.current.classList.add('long')
  //       }
  //     }
  //   }

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header title='셀럽 검색' isModalHeader={true} modalCloseBtnClick={onClose} />
        </div>
        {/* 입력내용 없을 시 */}
        {searchValue === '' ? (
          <>
            <SearchWrapper>
              <SearchTextfield
                value={searchValue}
                setValue={setSearchValue}
                onEnter={onSearch}
                placeholder='셀럽을 검색해주세요'
              ></SearchTextfield>
            </SearchWrapper>
            <div className='default' ref={defaultRef}>
              <HotCeleb></HotCeleb>

              <div className='myCeleb' ref={myCelebRef}>
                <MyCeleb></MyCeleb>
              </div>
              {/* {defaultRef.current?.classList.contains('long') && ( */}
              <ButtonWrapper>
                <ButtonLarge
                  text='완료'
                  active={selectedCeleb !== 0}
                  onClick={onComplete}
                ></ButtonLarge>
              </ButtonWrapper>
              {/* )} */}
            </div>
          </>
        ) : (
          // 입력내용 존재
          <div className='long'>{success ? <BrandList></BrandList> : <>없는 브랜드</>}</div>
        )}
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCelebSearchModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .Header {
    padding: 0 1.25rem;
  }
  .long {
    height: 38.375rem !important;
    overflow: scroll;
  }
  .default {
    height: 26.75rem;
    overflow: scroll;
    transition: ease-in 0.1s;
  }
  .hotCeleb {
    border: 1px solid red;
    height: 5.3125rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  .myCeleb {
    /* border: 1px solid blue; */
    margin-bottom: 4.375rem;
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

const ButtonWrapper = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.75rem 1.25rem;
`
