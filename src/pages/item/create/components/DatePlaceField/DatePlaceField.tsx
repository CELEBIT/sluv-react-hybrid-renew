import { memo } from 'react'
import { DatePlaceWrapper, DateWrapper, PlaceWrapper, Title, Line, ValueText } from './style'
import { useRecoilValue } from 'recoil'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import { formatDate, getFormattedTodayDate } from './date.util'
import { createItemPlaceState, createItemWhenDateState } from '../../../../../recoil/itemInfo'

const DatePlaceField = () => {
  const { openModal } = useModals()

  // 날짜 형식 UTC 기준 한국시간
  const formattedTodayDate = getFormattedTodayDate()

  const whenDiscovery = useRecoilValue(createItemWhenDateState)
  const whereDiscovery = useRecoilValue(createItemPlaceState)

  // 날짜 선택 모달
  const onDateSelect = () => {
    openModal(modals.ItemDatePickerModal)
  }
  // 장소 입력 모달
  const onPlaceSelect = () => {
    openModal(modals.ItemPlaceInputModal)
  }
  return (
    <DatePlaceWrapper>
      <DateWrapper onClick={onDateSelect}>
        <Title>날짜</Title>
        {whenDiscovery ? (
          <ValueText>
            {/* YYYY.MM.DD 형식 */}
            {formatDate(whenDiscovery as Date)}
          </ValueText>
        ) : (
          // 날짜 미입력시 현재 날짜로 placeholder 지정
          <ValueText isEmpty={true}>{formattedTodayDate}</ValueText>
        )}
      </DateWrapper>
      <Line />
      <PlaceWrapper onClick={onPlaceSelect}>
        <Title>장소</Title>
        {whereDiscovery ? (
          <ValueText>{whereDiscovery}</ValueText>
        ) : (
          // 장소 미입력시 placeholder 지정
          <ValueText isEmpty={true}>예) 인스타그램</ValueText>
        )}
      </PlaceWrapper>
    </DatePlaceWrapper>
  )
}

export default memo(DatePlaceField)
