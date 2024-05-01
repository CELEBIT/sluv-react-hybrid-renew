import React, { useRef, useState } from 'react'
import Header from '../../../components/Header/Header'
import {
  DeleteFloatingContainer,
  EditBtn,
  HeaderWrap,
  Info,
  ListWrap,
  SelectedCtnDiv,
  TStoragePageStyle,
} from './styles'
import useTempItemQuery from '../../../apis/item/hooks/useTempItemQuery'
import { useObserver } from '../../../hooks/useObserver'
import TempItem from './components/TempItem'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { currentTempIdState } from '../../../recoil/itemInfo'
import { localStorageKeys } from '../../../config/localStorageKeys'

export const checkListState = atom<Array<number>>({
  key: atomKeys.checkListState,
  default: [],
})

const TemporaryStorage = () => {
  const { openModal } = useModals()

  const [isEditMode, setIsEditMode] = useState(false)
  const checkedList = useRecoilValue(checkListState)
  const [currentTempId, setCurrentTempId] = useRecoilState(currentTempIdState)

  const bottom = useRef(null)

  const { getTempItem } = useTempItemQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = getTempItem()
  console.log('temp data', data)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  const onDeleteSelected = () => {
    if (checkedList.length === 0) {
      alert('삭제할 아이템을 선택해주세요')
      return
    }
    openModal(modals.DeleteTempItemModal, { type: '선택삭제' })
  }
  const onDeleteAll = () => {
    openModal(modals.DeleteTempItemModal, { type: '전체삭제' })
  }

  const localTempId = Number(localStorage.getItem(localStorageKeys.TEMP_ITEM_ID))

  return (
    <TStoragePageStyle>
      <HeaderWrap>
        <Header isModalHeader={false} title={'임시 보관함'} hasArrow={true}>
          <EditBtn
            onClick={() => setIsEditMode((prev) => !prev)}
            disabled={!isEditMode && (data?.pages[0].countNum ?? 0) < 2}
          >
            {isEditMode ? '완료' : '편집'}
          </EditBtn>
        </Header>
        {isEditMode ? (
          <SelectedCtnDiv>
            총<span> {checkedList.length}</span>개 선택됨
          </SelectedCtnDiv>
        ) : (
          <SelectedCtnDiv>
            총<span> {data?.pages[0].countNum ?? 0}</span>개 보관 중
          </SelectedCtnDiv>
        )}
      </HeaderWrap>
      <ListWrap>
        {status === 'error' && <p>{JSON.stringify(error.response.data)}</p>}
        {status === 'success' &&
          data?.pages.map(
            (item, index) =>
              item.content.length > 0 &&
              item.content.map((temp, idx) => {
                return (
                  <TempItem
                    key={temp.id}
                    data={temp}
                    isFirst={currentTempId && localTempId ? currentTempId === temp.id : false}
                    isEditMode={isEditMode}
                  />
                )
              }),
          )}
        <div ref={bottom} />
        {isFetching && !isFetchingNextPage ? (
          <div className='spinner'>
            <div>Loading</div>
          </div>
        ) : null}
      </ListWrap>
      <Info>작성 후 90일 까지 보관돼요</Info>
      {isEditMode && (
        <DeleteFloatingContainer>
          <div className='wrapper'>
            <button onClick={onDeleteAll}>전체 삭제</button>
            <span className='line'></span>
            <button onClick={onDeleteSelected}>선택 삭제</button>
          </div>
        </DeleteFloatingContainer>
      )}
    </TStoragePageStyle>
  )
}

export default TemporaryStorage
