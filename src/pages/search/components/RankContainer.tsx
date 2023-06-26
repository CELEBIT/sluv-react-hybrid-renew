import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../components/styles'
import { getRankingUpdateTime } from '../../../utils/utility'

const RankContainer = () => {
  const currentTime = new Date()
  const timeString = getRankingUpdateTime(currentTime)

  return (
    <RankWrap>
      <TitleBar>
        <span className='title'>인기 검색어</span>
        <span className='date'>{timeString}</span>
      </TitleBar>
    </RankWrap>
  )
}

export default RankContainer

const RankWrap = styled.section`
  margin-top: 1.5rem;
`
const TitleBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5625rem 1.25rem 0.5625rem 1.25rem;
  width: 100%;
  span {
    ${Pretendard({
      size: 15,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
  .date {
    font-size: 0.875rem;
    color: ${Common.colors.GR500};
    margin-left: 0.75rem;
  }
`
