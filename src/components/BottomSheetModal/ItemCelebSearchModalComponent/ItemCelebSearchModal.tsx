import React, { useState, useRef } from 'react'
import BottomSheetModal from '..'
import styled from '@emotion/styled'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import SearchTextfield from '../../TextField/SearchTextfield/SearchTextfield'
import Header from '../../Header/Header'
import HotCeleb from './HotCeleb'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import {
  CelebData,
  selectedCelebState,
  selectedGroupState,
  selectedNewCelebState,
} from '../../SelectCeleb/SelectCeleb'
import { useRecoilState, useSetRecoilState } from 'recoil'
import MyCeleb from './MyCeleb'
import RecentSelectCeleb from './RecentSelectCeleb'
import HighlightedText from '../../HighlightedText/HighlightedText'
import { Common, Pretendard } from '../../styles'

const ItemCelebSearchModal = () => {
  const resultList = [
    {
      id: 1,
      celebNameKr: '있지 예지',
      celebNameEn: 'ITZY Yezi',
    },
    {
      id: 11,
      celebNameKr: '있지 예나',
      celebNameEn: 'ITZY Yezi',
    },
    {
      id: 12,
      celebNameKr: '있지 리아',
      celebNameEn: 'ITZY Lia',
    },
    {
      id: 13,
      celebNameKr: '있지 류진',
      celebNameEn: 'ITZY RyuJin',
    },
    {
      id: 14,
      celebNameKr: '있지 채령',
      celebNameEn: 'ITZY ChaeRyoung',
    },
    {
      id: 15,
      celebNameKr: '있지 유나',
      celebNameEn: 'ITZY Yuna',
    },
    {
      id: 17,
      celebNameKr: '있지 유진',
      celebNameEn: 'ITZY YuJin',
    },
    {
      id: 2,
      celebNameKr: '아이유',
      celebNameEn: 'IU',
    },
  ]
  const [searchValue, setSearchValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const setNewCeleb = useSetRecoilState(selectedNewCelebState)
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)
  const { closeModal } = useModals()
  const defaultRef = useRef<HTMLDivElement>(null)
  const myCelebRef = useRef<HTMLDivElement>(null)
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

  const onSearch = () => {
    console.log('검색')
  }

  const onClickExistingCeleb = (celeb: CelebData) => {
    setSelectedCeleb(celeb)
    setSelectedGroup({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }
  const onClickNewCeleb = (name: string) => {
    setNewCeleb({ newCelebName: name })
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    setSelectedGroup({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }

  const onClose = () => {
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }
  const onComplete = () => {
    console.log(selectedCeleb)
    closeModal(modals.ItemCelebSearchModal)
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
        <SearchWrapper onFocus={() => setIsFocused(true)} onBlur={handleBlur}>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            onEnter={onSearch}
            placeholder='셀럽을 검색해주세요'
          ></SearchTextfield>
        </SearchWrapper>
        {searchValue === '' ? (
          <>
            {isFocused === false ? (
              <>
                <div className='long' ref={defaultRef}>
                  <HotCeleb></HotCeleb>
                  <div className='myCeleb' ref={myCelebRef}>
                    <MyCeleb></MyCeleb>
                  </div>
                  {/* {defaultRef.current?.classList.contains('long') && ( */}
                  <ButtonWrapper>
                    <ButtonLarge
                      text='완료'
                      active={selectedCeleb.id !== 0}
                      onClick={onComplete}
                    ></ButtonLarge>
                  </ButtonWrapper>
                  {/* )} */}
                </div>
              </>
            ) : (
              <>
                <div className='long' ref={defaultRef}>
                  <RecentSelectCeleb></RecentSelectCeleb>
                  {/* )} */}
                </div>
              </>
            )}
          </>
        ) : (
          // 입력내용 존재,
          <div className='long'>
            <SearchResult>
              {resultList.length ? (
                resultList.map((celeb, index) => (
                  <ExistingCeleb key={index} onClick={() => onClickExistingCeleb(celeb)}>
                    <HighlightedText searchText={searchValue} text={celeb.celebNameKr} />
                    <SubText>
                      <span>가수 / &nbsp; </span>
                      <HighlightedText searchText={searchValue} text={celeb.celebNameEn} />
                    </SubText>
                  </ExistingCeleb>
                ))
              ) : (
                <NotExistingCeleb onClick={() => onClickNewCeleb(searchValue)}>
                  <HighlightedText searchText={searchValue} text={searchValue} />
                </NotExistingCeleb>
              )}
            </SearchResult>
          </div>
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

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
`

const ButtonWrapper = styled.div`
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.75rem 1.25rem;
`
const ExistingCeleb = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem 0.875rem 0.75rem;
  gap: 0.25rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`
const NotExistingCeleb = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.75rem 1.25rem 0.75rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`
const SubText = styled.div`
  display: flex;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR500,
  })}
`
