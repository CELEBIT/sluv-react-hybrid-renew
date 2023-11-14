import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../components/styles'
import { getRankingUpdateTime } from '../../../utils/utility'
import useSearchRankQuery from '../../../apis/search/hooks/useSearchRankQuery'
import SliderWrapper from './SliderWrapper'

const RankContainer = () => {
  const currentTime = new Date()
  const timeString = getRankingUpdateTime(currentTime)

  const { getSearchRank: {data}} = useSearchRankQuery()

  return (
    <RankWrap>
      <TitleBar>
        <span className='title'>인기 검색어</span>
        <span className='date'>{timeString}</span>
      </TitleBar>
      {data && <SliderWrapper data={data} />}
    </RankWrap>
  )
}

export default RankContainer

const RankWrap = styled.section`
  margin-top: 1.5rem;

  .navigation-wrapper {
    position: relative;
  }

  .dots {
    display: flex;
    justify-content: center;
  }

  .dot {
    border: none;
    width: 6px;
    height: 6px;
    background: ${Common.colors.GR300};
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }

  .dot:focus {
    outline: none;
  }

  .dot.active {
    background: ${Common.colors.BK};
  }
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

