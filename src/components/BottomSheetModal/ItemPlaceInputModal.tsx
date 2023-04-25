import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'
import { selectedPlaceState } from '../../pages/item/create/components/DatePlaceField'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import DefaultTextfield from '../TextField/DefaultTextfield/DefaultTextfield'
import Chip from '../Chip/Chip'
import { Common, Pretendard } from '../styles'
import Header from '../Header/Header'

const ItemPlaceInputModal = () => {
  const [place, setPlace] = useRecoilState(selectedPlaceState)
  const { closeModal } = useModals()

  const onChipClick = (place: string) => {
    setPlace(place)
  }
  const onComplete = () => {
    closeModal(modals.ItemDatePickerModal)
  }

  return (
    <BottomSheetModal>
      <HeaderWrapper>
        <Header
          title='착용 장소'
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemDatePickerModal)}
        />
        <DefaultTextfield
          value={place}
          setValue={setPlace}
          onEnter={onComplete}
          placeholder='셀럽이 착용한 장소를 알려주세요'
        ></DefaultTextfield>
      </HeaderWrapper>
      <ModalWrapper>
        <HotPlaceWrapper>
          <span>핫 플레이스</span>
          <ChipWrapper>
            <Chip text='인기가요' onClick={() => onChipClick('인기가요')}></Chip>
            <Chip text='인스타그램' onClick={() => setPlace('인스타그램')}></Chip>
            <Chip text='유튜브' onClick={() => setPlace('유튜브')}></Chip>
            <Chip text='틱톡' onClick={() => setPlace('틱톡')}></Chip>
            <Chip text='뮤직뱅크' onClick={() => setPlace('뮤직뱅크')}></Chip>
            <Chip text='인기가요' onClick={() => setPlace('인기가요')}></Chip>
            <Chip text='last' onClick={() => setPlace('last')}></Chip>
          </ChipWrapper>
        </HotPlaceWrapper>
        <ButtonWrapper>
          <ButtonLarge text='완료' active={true} onClick={onComplete}></ButtonLarge>
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
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`

export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.5rem 0 0 1.25rem;
  margin-bottom: 2.5rem;
  gap: 1.0625rem;
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 1.25rem;
`
