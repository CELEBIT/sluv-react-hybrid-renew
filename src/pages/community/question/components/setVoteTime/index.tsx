import React from 'react'
import { SetVoteDateTimeWrapper, SetVoteDateTimeView } from './styles'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../../../../recoil/communityInfo'

const SetVoteDateTime = () => {
  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const currentDateTime = new Date()
  const defaultEndDateTime = new Date(new Date().setDate(currentDateTime.getDate() + 1))
  const minEndDateTime = new Date(new Date().setHours(currentDateTime.getHours() + 3))
  const maxEndDateTime = new Date(new Date().setDate(currentDateTime.getDate() + 7))

  const onChangeDate = (date: Date) => {
    console.log(date.toISOString())
    setQuestionInfo({
      ...questionInfo,
      voteEndTime: new Date(date.toISOString()),
    })
  }

  const labelRenderer = (type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '년'
      case 'month':
        return data + '월'
      case 'day':
        return data + '일'
      case 'hour':
        return data + '시'
      case 'minute':
        return data + '분'
      default:
        return data
    }
  }

  return (
    <SetVoteDateTimeWrapper>
      <SetVoteDateTimeView
        min={minEndDateTime}
        max={maxEndDateTime}
        defaultValue={defaultEndDateTime}
        value={questionInfo.voteEndTime}
        precision='minute'
        onChange={onChangeDate}
        renderLabel={labelRenderer}
      />
    </SetVoteDateTimeWrapper>
  )
}

export default SetVoteDateTime
