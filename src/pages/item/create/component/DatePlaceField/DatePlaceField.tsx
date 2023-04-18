import React from 'react'
import { DatePlaceWrapper, DateWrapper, PlaceWrapper, Title, Line, ValueText } from './style'
import { atom, useRecoilValue } from 'recoil'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'

export const selectedDateState = atom<Date | undefined>({
  // API 호출 시 null로 변환해서 전달
  key: 'selectedDateState',
  default: undefined,
})

export const selectedPlaceState = atom<string | null>({
  key: 'selectedPlaceState',
  default: null,
})

const DatePlaceField = () => {
  const { openModal } = useModals()

  // 날짜 형식 UTC 기준 한국시간
  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  const formattedTodayDate = today.toISOString().substring(2, 10).replaceAll('-', '. ')

  const selectedDate = useRecoilValue(selectedDateState)
  const selectedPlace = useRecoilValue(selectedPlaceState)

  // 날짜 선택 모달
  const onDateSelect = () => {
    openModal(modals.ItemDatePickerModal)
    console.log('date select Modal')
  }
  // 장소 입력 모달
  const onPlaceSelect = () => {
    console.log('place select Modal')
  }
  return (
    <DatePlaceWrapper>
      <DateWrapper onClick={onDateSelect}>
        <Title>날짜</Title>
        {selectedDate ? (
          <ValueText>
            {/* YYYY.MM.DD 형식 */}
            {selectedDate.toISOString().substring(2, 10).replaceAll('-', '. ')}
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
