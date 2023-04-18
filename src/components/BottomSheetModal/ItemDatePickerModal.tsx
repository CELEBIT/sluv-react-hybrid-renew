import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import CustomDatepicker from '../CustomDatePicker/CustomDatePicker'
import { useRecoilState } from 'recoil'
import { selectedDateState } from '../../pages/item/create/component/DatePlaceField'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'

const ItemDatePickerModal = () => {
  const [date, setDate] = useRecoilState(selectedDateState)
  const { closeModal } = useModals()
  const onComplete = () => {
    if (date === undefined) {
      const today = new Date()
      const UTCDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      setDate(UTCDate)
    }
    closeModal(modals.ItemDatePickerModal)
  }
  const onCancel = () => {
    setDate(undefined)
    closeModal(modals.ItemDatePickerModal)
  }
  return (
    <BottomSheetModal>
      <button onClick={onCancel}>닫기</button>
      <ModalWrapper>
        <CustomDatepicker date={date} setDate={setDate} />
        <ButtonLarge text='완료' active={true} onClick={onComplete}></ButtonLarge>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemDatePickerModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 2.125rem;
`
