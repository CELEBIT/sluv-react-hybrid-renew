import React, { HTMLAttributes, PropsWithChildren } from 'react'
import * as S from './styles'

type CreateClosetBoxButton = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>

const CreateClosetBoxButton = ({ children, ...rest }: CreateClosetBoxButton) => {
  return (
    <S.ClosetCreateFooterElementWrapper>
      <S.Button {...rest}>{children}</S.Button>
    </S.ClosetCreateFooterElementWrapper>
  )
}

export default CreateClosetBoxButton
