import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../../../components/styles'

interface VoteDisplayFieldProps {
  dateTime: Date | null | undefined
}

const VoteDisplayField = ({ dateTime }: VoteDisplayFieldProps) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedDate = dateTime?.toLocaleDateString('ko-KR', optionsDate)
  const formattedTime = dateTime?.toLocaleTimeString('ko-KR', optionsTime)
  return (
    <VoteDisplayFieldWrapper>
      <Label>종료일</Label>
      <DateWrapper>
        <Date>{formattedDate}</Date>
        <Date>{formattedTime}</Date>
      </DateWrapper>
    </VoteDisplayFieldWrapper>
  )
}

export const VoteDisplayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  gap: 6px;
`
export const Label = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
`
export const Date = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.BK })}
`
export default VoteDisplayField
