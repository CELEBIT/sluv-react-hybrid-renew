import React from 'react'
import * as S from './NameTag.styles'
import { CoverBoxColorKey } from '../../utils/consts'
import { ReactComponent as LockIcon } from '../../../../assets/lock_20.svg'
import { ReactComponent as SidebarIcon } from '../../../../assets/chip_sidebar_20.svg'

type NameTagChipProps = {
  colorScheme: CoverBoxColorKey
  count: number
}

const NameTagChip = ({ count, colorScheme }: NameTagChipProps) => {
  return (
    <S.ChipRoot>
      <S.ChipLayout colorScheme={colorScheme}>
        <S.TitleWrapper>{count}개 보관 중</S.TitleWrapper>
        <SidebarIcon />
        <LockIcon />
      </S.ChipLayout>
    </S.ChipRoot>
  )
}

export default NameTagChip
