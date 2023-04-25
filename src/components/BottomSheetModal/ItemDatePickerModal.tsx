import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import CustomDatepicker from '../CustomDatePicker/CustomDatePicker'
import { useRecoilState } from 'recoil'
import { selectedDateState } from '../../pages/item/create/components/DatePlaceField'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import Header from '../Header/Header'

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
      <ModalWrapper>
        <Header title='착용 날짜' isModalHeader={true} modalCloseBtnClick={onCancel} />
        <CustomDatepicker date={date} setDate={setDate} />
        <ButtonWrapper>
          <ButtonLarge text='완료' active={true} onClick={onComplete}></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemDatePickerModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 1.25rem;
`
const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 0;
`
