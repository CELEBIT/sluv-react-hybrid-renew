import styled from 'styled-components'
import { Common } from '../styles'

export const ChipWrapper = styled.div<{ canDelete?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 2.625rem;
  min-width: 3.625rem;
  padding: 0.75rem 1rem;
  border-radius: 1.5625rem;

  background-color: ${Common.colors.BG};
  color: ${Common.colors.SEC};
  font-weight: 500;

  p {
    margin: 0;
  }

  div {
    display: flex;
    margin-left: ${(props) => (props.canDelete ? '4px' : 0)}; /* add margin between text and icon */
  }

  :hover {
    cursor: pointer;
  }
`
