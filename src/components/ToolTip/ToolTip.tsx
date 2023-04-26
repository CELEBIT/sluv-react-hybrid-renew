import React from 'react'
import { TooltipWrapper, TooltipContainer, Arrow } from './styles'

interface ITooltipProps {
  x: string
  y: string
  arrowPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  text: string
  isVisible: boolean
}

const ToolTip = ({ x, y, arrowPosition, text, isVisible }: ITooltipProps) => {
  return (
    <TooltipContainer>
      {isVisible && (
        <TooltipWrapper left={x} top={y}>
          <div className='preline'>{text}</div>
          <Arrow arrowPosition={arrowPosition} />
        </TooltipWrapper>
      )}
    </TooltipContainer>
  )
}

export default ToolTip
