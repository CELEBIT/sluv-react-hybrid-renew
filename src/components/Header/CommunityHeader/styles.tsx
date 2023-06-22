import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'

export const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0.6875rem 0;

  ${Pretendard({
    size: 18,
    weight: Common.bold.semiBold,
    color: Common.colors.BK,
  })};

  .left {
    display: flex;
    align-items: center;
  }
  .arrow-back {
    margin-right: 0.5rem;
  }
  .right {
    display: flex;
    align-items: center;
  }
`
