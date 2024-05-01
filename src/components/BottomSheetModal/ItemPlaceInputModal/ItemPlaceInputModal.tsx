import React, { useState } from 'react'
import BottomSheetModal from '..'
import styled from '@emotion/styled'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'
import DefaultTextfield from '../../TextField/DefaultTextfield/DefaultTextfield'
import { Common, Pretendard } from '../../styles'
import Header from '../../Header/Header'
import useHotPlaceQuery from '../../../apis/place/hooks/useHotPlaceQuery'
import useRecentPlaceQuery from '../../../apis/place/hooks/useRecentPlaceQuery'
import ItemPlaceChip from './ItemPlaceChip'
import usePostPlaceQuery from '../../../apis/place/hooks/usePostPlaceQuery'
import { createItemPlaceState } from '../../../recoil/itemInfo'
import { useRecoilState, useRecoilValue } from 'recoil'

const ItemPlaceInputModal = () => {
  const [whereDiscovery, setWhereDiscovery] = useRecoilState(createItemPlaceState)
  const [placeName, setPlaceName] = useState(whereDiscovery ?? '')

  // 최근 입력 장소, hot 장소 GET
  const {
    getHotPlace: { data: hotPlaceData },
  } = useHotPlaceQuery()
  const {
    getRecentPlace: { data: recentPlaceData },
    deleteAllRecentPlace: { mutate: mutateByDeleteAllRecentPlace },
  } = useRecentPlaceQuery()

  // 최근 입력 장소 POST
  const {
    postItemPlace: { mutate: mutateByPostItemPlace },
  } = usePostPlaceQuery()

  const { closeModal } = useModals()
  const onComplete = () => {
    if (placeName !== '' || placeName !== whereDiscovery) {
      if (placeName !== '') {
        mutateByPostItemPlace({ placeName })
      }
      setWhereDiscovery(placeName)
    }
    closeModal(modals.ItemPlaceInputModal)
  }
  const onDeleteAllSearchLog = () => {
    mutateByDeleteAllRecentPlace()
  }

  return (
    <BottomSheetModal>
      <HeaderWrapper>
        <Header
          title='착용 장소'
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemPlaceInputModal)}
        />
        <DefaultTextfield
          value={placeName}
          setValue={setPlaceName}
          onEnter={onComplete}
          placeholder='셀럽이 착용한 장소를 알려주세요'
        ></DefaultTextfield>
      </HeaderWrapper>
      <ModalWrapper>
        <HotPlaceWrapper>
          {(recentPlaceData?.length ?? 0) > 0 ? (
            <>
              <SearchLogWrapper>
                <span>최근 입력한 장소</span>
                <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
              </SearchLogWrapper>
              <ChipWrapper>
                {recentPlaceData?.map((item, index) => (
                  <ItemPlaceChip key={index} placeName={item.placeName} canDelete={true} />
                ))}
              </ChipWrapper>
            </>
          ) : (
            <>
              <span className='hotPlaceTitle'>핫 플레이스</span>
              <ChipWrapper>
                {(hotPlaceData?.length ?? 0) > 0 &&
                  hotPlaceData?.map((item, index) => (
                    <ItemPlaceChip key={index} placeName={item.placeName} canDelete={false} />
                  ))}
              </ChipWrapper>
            </>
          )}
        </HotPlaceWrapper>
        <ButtonWrapper>
          <ButtonLarge
            text='완료'
            active={placeName !== '' || placeName !== whereDiscovery}
            onClick={placeName !== '' || placeName !== whereDiscovery ? onComplete : undefined}
          ></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemPlaceInputModal

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.25rem;
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HotPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;

  span {
    margin: 0.5625rem 0;
    ${Pretendard({
      size: 15,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
  .hotPlaceTitle {
    margin-left: 1.5rem;
  }
`

export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.5rem 0 0 1.25rem;
  margin-bottom: 2rem;
  gap: 1.0625rem;
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 1.25rem;
`
const SearchLogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1.5rem;
`
const DeleteAllText = styled.span`
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Common.colors.BK} !important;
`
