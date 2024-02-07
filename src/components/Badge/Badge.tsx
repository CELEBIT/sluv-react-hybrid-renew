import React from 'react'
import { BadgeWrapper } from './styles'
// /import { Common } from '../styles'

interface BadgeProps {
  color: string
  // gray, pink, orange, yellow, green, blue
  children: any
}

const Badge = ({ color, children }: BadgeProps) => {
  return (
    <BadgeWrapper color={color}>
      <span>{children}</span>
    </BadgeWrapper>
  )
}

export default Badge
