import styled from '@emotion/styled'
import { Common } from '../styles'

export const ChipWrapper = styled.div<{ canDelete?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 2.625rem;
  min-width: 3.625rem;
  padding: 0.75rem 1rem;
  border-radius: 1.5625rem;

  background-color: ${Common.colors.BG};
  color: ${Common.colors.PRI};
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 0.9375rem;

  p {
    margin: 0;
    white-space: nowrap;
    margin-right: ${(props) => (props.canDelete ? '4px' : 0)};
  }

  div {
    display: flex;
  }

  :hover {
    cursor: pointer;
  }
`
export const ColorChipWrapper = styled.div<{
  active: boolean
  canDelete?: boolean
  size?: string
  color: string
}>`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 2.625rem;
  min-width: 3.625rem;
  /* padding: 12px 16px; */
  padding: ${(props) => (props.size === 'small' ? '0.5rem 0.75rem' : '0.75rem 1rem')};
  border-radius: 1.5625rem;
  background-color: white;
  border: ${(props) =>
    props.active
      ? `1px solid ${
          props.color === 'pink'
            ? '#F1D9E2'
            : props.color === 'orange'
            ? '#F1E2D9'
            : props.color === 'yellow'
            ? '#F1EAD9'
            : props.color === 'green'
            ? '#DBF1D9'
            : props.color === 'blue' && '#D9E5F1'
        }`
      : `1px solid ${Common.colors.GR300}`};

  color: ${(props) =>
    props.active
      ? props.color === 'pink'
        ? Common.colors.PK
        : props.color === 'orange'
        ? Common.colors.ORG
        : props.color === 'yellow'
        ? Common.colors.YL
        : props.color === 'green'
        ? Common.colors.GRN
        : props.color === 'blue' && Common.colors.BL
      : Common.colors.GR600};

  font-family: Pretendard;
  font-weight: 500;
  font-size: ${(props) => (props.size === 'small' ? '0.875rem' : '0.9375rem')};

  p {
    margin: 0;
    white-space: nowrap;
    margin-right: ${(props) => (props.canDelete ? '4px' : 0)};
  }

  div {
    display: flex;
  }

  :hover {
    cursor: pointer;
  }
`
