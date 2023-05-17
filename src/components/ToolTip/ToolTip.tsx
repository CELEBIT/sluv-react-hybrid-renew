import React from 'react'
import { TooltipWrapper, TooltipContainer, Arrow } from './styles'

interface ITooltipProps {
  left?: string
  top?: string
  right?: string
  bottom?: string
  arrowPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  isVisible: boolean
  children?: any
}

const ToolTip = ({
  left,
  right,
  top,
  bottom,
  arrowPosition,
  isVisible,
  children,
}: ITooltipProps) => {
  return (
    <TooltipContainer>
      {isVisible && (
        <TooltipWrapper left={left} right={right} top={top} bottom={bottom}>
          <span>{children}</span>
          <Arrow arrowPosition={arrowPosition} />
        </TooltipWrapper>
      )}
    </TooltipContainer>
  )
}

export default ToolTip
