import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../components/styles'
import { useNavigate } from 'react-router-dom'

interface RankProps {
  keyword: string
  idx: number
}

const Rank = ({ keyword, idx }: RankProps) => {
  const navigate = useNavigate()

  const onClickRank = () => {
    navigate(`/search/result?keyword=${keyword}`)
  }

  return (
    <RankWrapper onClick={onClickRank}>
      <span>{idx + 1}</span>
      <span className='keyword'>{keyword}</span>
    </RankWrapper>
  )
}

export default Rank

const RankWrapper = styled.div`
  display: flex;

  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  }

  .keyword {
    margin-left: 1rem;
  }
`
