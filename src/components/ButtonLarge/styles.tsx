import styled from '@emotion/styled'
import { Common } from '../styles'

export const LargeWrapper = styled.div<{
  active: boolean
  color?: string
}>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 3.5rem;
  width: 100%;
  padding: 1.0938rem 0.9rem;
  border-radius: 0.75rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1.125rem;

  color: ${(props) => (props.active ? 'white' : Common.colors.GR500)};
  background-color: ${(props) => (props.active ? Common.colors.COMPLETE : Common.colors.GR200)};

  ${({ color, active }) =>
    color === 'BK' &&
    `
    background-color: ${active ? Common.colors.BK : Common.colors.GR200};
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
