import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

interface IHeaderWrapper {
  isModalHeader: boolean
}

export const HeaderWrapper = styled.header<IHeaderWrapper>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.isModalHeader ? '1rem 0' : '0.6875rem 0')};

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

  /* 삭제예정 */
  border: 1px solid red;
`

export const Title = styled.span`
  ${Pretendard({
    size: 16,
    weight: Common.bold.semiBold,
    color: Common.colors.BK,
  })};
`
