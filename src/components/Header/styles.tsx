import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export interface IHeaderWrapper {
  isModalHeader: boolean
}

export const HeaderWrapper = styled.header<IHeaderWrapper>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.isModalHeader ? '1rem 0' : '0.6875rem 0')};
  flex-shrink: 0;

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
    gap: 1.25rem;
  }
`

export const Title = styled.span``
