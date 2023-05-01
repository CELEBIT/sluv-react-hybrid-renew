import React from 'react'
import { DatePlaceWrapper, DateWrapper, PlaceWrapper, Title, Line, ValueText } from './style'
import { useRecoilValue } from 'recoil'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import { formatDate, getFormattedTodayDate } from './date.util'
import { selectedDateState, selectedPlaceState } from '../../../../../config/atomKeys'

const DatePlaceField = () => {
  const { openModal } = useModals()

  // 날짜 형식 UTC 기준 한국시간
  const formattedTodayDate = getFormattedTodayDate()

  const selectedDate = useRecoilValue(selectedDateState)
  const selectedPlace = useRecoilValue(selectedPlaceState)

  // 날짜 선택 모달
  const onDateSelect = () => {
    openModal(modals.ItemDatePickerModal)
    console.log('date select Modal')
  }
  // 장소 입력 모달
  const onPlaceSelect = () => {
    openModal(modals.ItemPlaceInputModal)
    console.log('place select Modal')
  }
  return (
    <DatePlaceWrapper>
      <DateWrapper onClick={onDateSelect}>
        <Title>날짜</Title>
        {selectedDate ? (
          <ValueText>
            {/* YYYY.MM.DD 형식 */}
            {formatDate(selectedDate)}
          </ValueText>
        ) : (
          // 날짜 미입력시 현재 날짜로 placeholder 지정
          <ValueText isEmpty={true}>{formattedTodayDate}</ValueText>
        )}
      </DateWrapper>
      <Line />
      <PlaceWrapper onClick={onPlaceSelect}>
        <Title>장소</Title>
        {selectedPlace ? (
          <ValueText>{selectedPlace}</ValueText>
        ) : (
          // 장소 미입력시 placeholder 지정
          <ValueText isEmpty={true}>예) 인스타그램</ValueText>
        )}
      </PlaceWrapper>
    </DatePlaceWrapper>
  )
}

export default DatePlaceField
