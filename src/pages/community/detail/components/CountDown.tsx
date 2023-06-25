import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Common, Pretendard } from '../../../../components/styles'

interface CountDownProps {
  voteEndTime: Date
}
const CountDown = ({ voteEndTime }: CountDownProps) => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(voteEndTime).getTime()
      const timeRemaining = end - now

      if (timeRemaining <= 0) {
        // Voting has ended, handle accordingly
        clearInterval(interval)
        setTimeLeft('Voting Ended')
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

        setDaysLeft(days)
        setTimeLeft(`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [voteEndTime])

  return (
    <CountDownWrapper>
      {daysLeft !== null && (
        <TimeText>
          {daysLeft}
          <DayText>&nbsp;일</DayText>&nbsp;&nbsp;&nbsp;
        </TimeText>
      )}
      <TimeText>{timeLeft}</TimeText>
    </CountDownWrapper>
  )
}

export const CountDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Common.colors.GR50};
  border-radius: 0.625rem;
  padding: 0.75rem 0;
`

const DayText = styled.span`
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR600 })}
`
const TimeText = styled.span`
  ${Pretendard({ size: 32, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default CountDown
