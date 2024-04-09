import React, { useState, useRef } from 'react'
import BottomSheetModal from '..'
import styled from '@emotion/styled'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import SearchTextfield from '../../TextField/SearchTextfield/SearchTextfield'
import Header from '../../Header/Header'
import HotCeleb from './HotCeleb'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import { selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { useRecoilState, useSetRecoilState } from 'recoil'
import MyCeleb from './MyCeleb'
import RecentSelectCeleb from './RecentSelectCeleb'
import { celebInfoInItemState, itemInfoState } from '../../../recoil/itemInfo'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import SearchCelebList from './SearchCelebList'

const ItemCelebSearchModal = () => {
  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const [searchValue, setSearchValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  // const setNewCeleb = useSetRecoilState(selectedNewCelebState)
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState)
  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const { closeModal } = useModals()
  const defaultRef = useRef<HTMLDivElement>(null)
  const myCelebRef = useRef<HTMLDivElement>(null)
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

  const onClose = () => {
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    setSelectedGroup({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCelebSearchModal)
  }
  const onComplete = () => {
    if (selectedCeleb.id && !selectedGroup.id) {
      // 솔로
      setCelebInfoInItem({
        soloId: selectedCeleb.id,
        soloName: selectedCeleb.celebNameKr,
        groupId: null,
        groupName: null,
      })
      setItemInfo({
        ...itemInfo,
        celeb: {
          celebId: selectedCeleb.id,
          celebName: selectedCeleb.celebNameKr,
        },
      })
    } else if (selectedCeleb.id && selectedGroup.id) {
      // 그룹의 멤버
      setCelebInfoInItem({
        soloId: selectedCeleb.id,
        soloName: selectedCeleb.celebNameKr,
        groupId: selectedGroup.id,
        groupName: selectedGroup.celebNameKr,
      })
      setItemInfo({
        ...itemInfo,
        celeb: {
          celebId: selectedCeleb.id,
          celebName: selectedCeleb.celebNameKr,
        },
      })
    } else {
      alert('오류')
    }
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    setSelectedGroup({ id: 0, celebNameKr: '' })

    mutateByPostRecentCeleb(
      { celebId: selectedCeleb.id, newCelebId: null },
      {
        onSuccess: () => {
          closeModal(modals.ItemCelebSearchModal)
        },
      },
    )
  }

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
                  <ButtonWrapper>
                    <ButtonLarge
                      text='완료'
                      active={selectedCeleb.id !== 0}
                      onClick={onComplete}
                    ></ButtonLarge>
                  </ButtonWrapper>
                </div>
              </>
            ) : (
              <>
                <div className='long' ref={defaultRef}>
                  <RecentSelectCeleb></RecentSelectCeleb>
                </div>
              </>
            )}
          </>
        ) : (
          // 입력내용 존재,
          <div className='long'>
            <SearchCelebList keyword={searchValue} />
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
    height: 75vh !important;
    overflow: scroll;
  }
  .default {
    height: 26.75rem;
    overflow: scroll;
    transition: ease-in 0.1s;
  }
  .hotCeleb {
    height: 5.3125rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
  .myCeleb {
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
