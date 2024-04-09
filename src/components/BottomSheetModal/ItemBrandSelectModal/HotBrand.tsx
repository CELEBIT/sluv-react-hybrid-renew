import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import React from 'react'
import { ChipWrapper } from './ItemBrandSelectModal'
import useTopBrandQuery from '../../../apis/brand/hooks/useTopBrandQuery'
import HotBrandChip from './HotBrandChip'

const HotBrand = () => {
  const {
    getTopBrand: { data },
  } = useTopBrandQuery()

  return (
    <HotWrapper>
      <span>인기 브랜드</span>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((brand) => {
            return <HotBrandChip key={brand.id} hotBrandData={brand} />
          })}
      </ChipWrapper>
    </HotWrapper>
  )
}

export default HotBrand

export const HotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`
