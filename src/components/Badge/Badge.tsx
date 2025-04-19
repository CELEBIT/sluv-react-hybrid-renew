import { ReactNode } from 'react'
import { BadgeWrapper } from './styles'

type BadgeColor = 'gray' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue'

interface BadgeProps {
  color: BadgeColor
  children: ReactNode
}

const Badge = ({ color = 'gray', children }: BadgeProps) => {
  return (
    <BadgeWrapper color={color}>
      <span>{children}</span>
    </BadgeWrapper>
  )
}

export default Badge
