import React from 'react'
import { Arrow, TooltipContainer } from './styles'

interface ITooltipProps {
  x: string
  y: string
  arrowPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  text: string
  isVisible: boolean
}

const ToolTip = ({ x, y, arrowPosition, text, isVisible }: ITooltipProps) => {
  return (
    <div style={{ position: 'relative' }}>
      {isVisible && (
        <TooltipContainer left={x} top={y}>
          <div className='preline'>{text}</div>
          <Arrow arrowPosition={arrowPosition} />
        </TooltipContainer>
      )}
    </div>
  )
}

export default ToolTip
