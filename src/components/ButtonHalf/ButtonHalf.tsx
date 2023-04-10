import React from 'react'
import { HalfWrapper } from './styles'

interface HalfButtonProps {
  text: string
  type: string
  // type = 'confirm' | 'cancel'
  onClick: () => void
}

const ButtonHalf = ({ text, type, onClick }: HalfButtonProps) => {
  return (
    <HalfWrapper type={type} onClick={onClick}>
      <p>{text}</p>
    </HalfWrapper>
  )
}

export default ButtonHalf
