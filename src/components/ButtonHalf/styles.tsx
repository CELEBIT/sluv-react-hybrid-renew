import styled from '@emotion/styled'
import { Common } from '../styles'

export const HalfWrapper = styled.div<{
  type: string
  isbottom?: boolean
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 3rem;
  width: 100%;
  padding: 0.9375rem;
  border-radius: 0.5rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 0.9375rem;

  color: ${(props) => (props.type === 'confirm' ? 'white' : Common.colors.BK)};
  background-color: ${(props) =>
    props.type === 'confirm' ? Common.colors.COMPLETE : Common.colors.GR200};

  ${({ isbottom }) =>
    isbottom === true &&
    `
    height: 3.5rem;
    width: 10.1875rem;
    padding: 1.0625rem;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    `}

  p {
    margin: 0;
  }

  div {
    display: flex;
  }

  :hover {
    cursor: pointer;
  }
`
