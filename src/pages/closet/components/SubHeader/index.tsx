import React, { forwardRef } from 'react'
import * as S from './styles'

export type SubHeaderProps = {
  leftPaneChildren: React.ReactNode
  rightPaneChildren: React.ReactNode
}

const SubHeader = ({ leftPaneChildren, rightPaneChildren }: SubHeaderProps) => {
  return (
    <S.Root>
      <S.Layout>
        <S.LeftPaneContainer>{leftPaneChildren}</S.LeftPaneContainer>
        <S.RightPaneContainer>{rightPaneChildren}</S.RightPaneContainer>
      </S.Layout>
    </S.Root>
  )
}
SubHeader.displayName = 'SubHeader'

export const PaddingSubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ leftPaneChildren, rightPaneChildren }, ref) => {
    return (
      <S.PaddedRoot ref={ref}>
        <S.Layout>
          <S.LeftPaneContainer>{leftPaneChildren}</S.LeftPaneContainer>
          <S.RightPaneContainer>{rightPaneChildren}</S.RightPaneContainer>
        </S.Layout>
      </S.PaddedRoot>
    )
  },
)
PaddingSubHeader.displayName = 'PaddingSubHeader'

export default SubHeader
