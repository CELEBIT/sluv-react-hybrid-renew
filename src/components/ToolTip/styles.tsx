import styled from 'styled-components'

export const TooltipContainer = styled.div<{ left: string; top: string }>`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  background-color: #212529;
  opacity: 0.8;
  color: white;
  font-family: 'Pretendard';
  font-weight: 200;
  font-size: 13px;
  line-height: 1.3;
  padding: 8px 12px;
  border-radius: 8px;
  z-index: 1;
  min-width: 150px;
  max-width: max-content;
  max-height: 3.25rem;
  overflow-wrap: break-word;

  .preline {
    white-space: pre-line;
  }
`

export const Arrow = styled.div<{
  arrowPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}>`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;

  ${({ arrowPosition }) =>
    arrowPosition === 'top-left'
      ? `
      top: -6px;
      left: 20px;
      border-bottom: 7px solid #212529;
      border-top-left-radius: 14px 3px;
    `
      : arrowPosition === 'top-right'
      ? `
      top: -6px;
      right: 20px;
      border-bottom: 7px solid #212529;
      border-top-right-radius: 14px 3px;
    `
      : arrowPosition === 'bottom-left'
      ? `
      bottom: -6px;
      left: 20px;
      border-top: 7px solid #212529;
      border-bottom-left-radius: 14px 3px;
    `
      : `
      bottom: -6px;
      right: 20px;
      border-top: 7px solid #212529;
      border-bottom-right-radius: 14px 3px;
    `}
`
