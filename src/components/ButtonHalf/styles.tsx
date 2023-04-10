import styled from 'styled-components'
import { Common } from '../styles'

export const HalfWrapper = styled.div<{
  type: string
}>`
  display: inline-flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  height: 3.5rem;
  width: 7.5rem;
  padding: 1.0938rem 0.9rem;
  border-radius: 0.5rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1.125rem;

  color: ${(props) => (props.type === 'confirm' ? 'white' : Common.colors.BK)};
  background-color: ${(props) =>
    props.type === 'confirm' ? Common.colors.COMPLETE : Common.colors.GR200};

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
