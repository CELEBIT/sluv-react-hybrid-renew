import styled from '@emotion/styled'
import { Common } from '../styles'

export const SmallWrapper = styled.div<{
  icon?: boolean
  type: string
  error?: boolean
}>`
  display: inline-flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  height: 1.875rem;
  min-width: ${(props) => (props.icon ? '3.5625rem' : '3.125rem')};
  width: auto;
  padding: ${(props) => (props.icon ? '0.375rem 0.375rem 0.375rem 0.75rem' : '0.375rem 0.75rem')};
  border-radius: 0.375rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 0.9375rem;

  color: ${({ type }) =>
    (type === 'pri' && `${Common.colors.GR600}`) || (type === 'sec' && `${Common.colors.BK}`)};

  background-color: 'white';

  border: ${({ type }) =>
    (type === 'pri' && `0.0625rem solid ${Common.colors.GR200}`) ||
    (type === 'sec' && `0.0625rem solid ${Common.colors.BK}`)};

  ${({ error }) =>
    error &&
    `
      border: 1px solid ${Common.colors.ERROR};
    `}

  p {
    margin: 0;
  }

  div {
    display: flex;
  }

  :hover {
    cursor: ${(props) => (props.type === 'disable' ? 'not-allowed' : 'pointer')};
  }
`
