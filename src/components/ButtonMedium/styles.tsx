import styled from '@emotion/styled'
import { Common } from '../styles'

export const MediumWrapper = styled.div<{
  icon?: boolean
  type: string
  active?: boolean
  error?: boolean
}>`
  display: inline-flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  height: 2.625rem;
  min-width: 3.625rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 0.9375rem;

  color: ${({ type }) =>
    (type === 'pri' && `${Common.colors.GR600}`) ||
    (type === 'sec' && `${Common.colors.BK}`) ||
    (type === 'disable' && `${Common.colors.GR500}`)};

  background-color: ${({ type }) =>
    (type === 'pri' && 'white') ||
    (type === 'sec' && 'white') ||
    (type === 'disable' && `${Common.colors.GR100}`)};

  border: ${({ type }) =>
    (type === 'pri' && `0.0625rem solid ${Common.colors.GR200}`) ||
    (type === 'sec' && `0.0625rem solid ${Common.colors.BK}`) ||
    (type === 'disable' && `0.0625rem solid ${Common.colors.GR200}`)};

  ${({ active }) =>
    active &&
    `
      background-color: ${Common.colors.BG};
      color:${Common.colors.SEC};
    `}

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
    margin-right: ${(props) => (props.icon ? '2px' : 0)}; /* add margin between text and icon */
  }

  :hover {
    cursor: ${(props) => (props.type === 'disable' ? 'not-allowed' : 'pointer')};
  }
`
