import React, { useState } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'
import CustomDatepicker from '../CustomDatePicker/CustomDatePicker'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import Header from '../Header/Header'
import { convertToKoDate, convertToUTC } from '../../utils/utility'
import { useSetRecoilState } from 'recoil'
import { createItemWhenDateState } from '../../recoil/itemInfo'

const ItemDatePickerModal = () => {
  const { closeModal } = useModals()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const utcToday = convertToUTC(today)
  const [date, setDate] = useState<Date | undefined>(utcToday)
  const setWhenDiscovery = useSetRecoilState(createItemWhenDateState)

  const onComplete = () => {
    closeModal(modals.ItemDatePickerModal, () => {
      setWhenDiscovery(date ?? null)
    })
  }
  const onCancel = () => {
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
