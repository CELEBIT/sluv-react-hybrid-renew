import { ReactNode } from 'react'
import { TooltipContent, TooltipWrapper, TriangleContainer } from './styles'

interface CelebCategoryTooltipProps {
  children: ReactNode
}

const CelebCategoryTooltip = ({ children }: CelebCategoryTooltipProps) => {
  return (
    <TooltipWrapper>
      <TooltipContent>{children}</TooltipContent>
      <TriangleContainer></TriangleContainer>
    </TooltipWrapper>
  )
}

export default CelebCategoryTooltip
