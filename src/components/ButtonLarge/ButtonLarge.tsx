import React from 'react'
import { LargeWrapper } from './styles'

interface LargeButtonProps {
  text: string
  active: boolean
  color?: string
  onClick: () => void
}

const ButtonLarge = ({ text, active, color, onClick }: LargeButtonProps) => {
  return (
    <LargeWrapper active={active} color={color} onClick={onClick}>
      <p>{text}</p>
    </LargeWrapper>
  )
}

export default ButtonLarge
