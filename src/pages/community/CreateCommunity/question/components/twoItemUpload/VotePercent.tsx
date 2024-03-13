import React from 'react'
import { Img, Item } from '../../../../../../apis/question/questionService.type'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'

interface VoteData {
  data: Img | Item
}

function VotePercent({ data }: VoteData) {
  return (
    <Container>
      <Bar percent={data.votePercent} active={data.votePercent >= 50}></Bar>
      <Percent className={data.votePercent >= 50 ? 'active' : undefined}>
        {data.voteNum}명 {data.votePercent}%
      </Percent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
  .active {
    ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.COMPLETE })}
  }
`

const Bar = styled.div<{ percent: number; active: boolean }>`
  display: flex;
  position: absolute;
  left: 0;
  width: ${(props) => props.percent}%;
  height: 100%;
  background-color: ${({ active }) => (active ? '#dedfff' : Common.colors.GR200)};
`

const Percent = styled.span`
  position: absolute;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export default VotePercent
