import React from 'react'
import { DatePlaceWrapper, DateWrapper, PlaceWrapper, Title, Line, ValueText } from './style'

interface DatePlaceProps {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
  place: string
  setPlace: React.Dispatch<React.SetStateAction<string>>
}

const DatePlaceField = ({ date, place }: DatePlaceProps) => {
  const today = new Date()
  const formattedDate = today.toISOString().substring(2, 10).replaceAll('-', '. ')
  const onDateSelect = () => {
    console.log('date select Modal')
  }
  const onPlaceSelect = () => {
    console.log('place select Modal')
  }
  return (
    <DatePlaceWrapper>
      <DateWrapper onClick={onDateSelect}>
        <Title>날짜</Title>
        {date ? (
          <ValueText>{date}</ValueText>
        ) : (
          <ValueText isEmpty={true}>{formattedDate}</ValueText>
        )}
      </DateWrapper>
      <Line />
      <PlaceWrapper onClick={onPlaceSelect}>
        <Title>장소</Title>
        {place ? (
          <ValueText>{place}</ValueText>
        ) : (
          <ValueText isEmpty={true}>예) 인스타그램</ValueText>
        )}
      </PlaceWrapper>
    </DatePlaceWrapper>
  )
}

export default DatePlaceField
