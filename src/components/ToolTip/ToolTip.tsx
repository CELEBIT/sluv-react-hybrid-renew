import React from 'react'
import { TooltipWrapper, TooltipContainer, Arrow } from './styles'

interface ITooltipProps {
  x: string
  y: string
  arrowPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  isVisible: boolean
  children?: any
}

const ToolTip = ({ x, y, arrowPosition, isVisible, children }: ITooltipProps) => {
  return (
    <TooltipContainer>
      {isVisible && (
        <TooltipWrapper left={x} top={y}>
          <span>{children}</span>
          <Arrow arrowPosition={arrowPosition} />
        </TooltipWrapper>
      )}
    </TooltipContainer>
  )
}

export default ToolTip
