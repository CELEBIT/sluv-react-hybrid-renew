import React from 'react'
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

export default SubHeader
