import React from 'react'
import * as S from './ClosetCoverBox.styles'
import NameTag from '../NameTag'
import { ClosetBoxService } from '../../services'
import ClosetBoxGrabIcon from '../GrabIcon'

export type ClosetCoverBoxProps = {
  service: ClosetBoxService
  editMode?: boolean
}

const ClosetCoverBox = ({ service, editMode = false }: ClosetCoverBoxProps) => {
  return (
    <S.RootContainer>
      <S.Layout closetBox={service}>
        <S.CoverBoxHeader>
          <NameTag service={{ closetBox: service, editMode }} />
        </S.CoverBoxHeader>
        <S.CoverBoxBody service={service}>
          <ClosetBoxGrabIcon
            coverBoxColor={service.colorScheme}
            coverImageMode={service.coverImageMode}
          />
        </S.CoverBoxBody>
        <S.CoverBoxFooter>{service.itemNum}</S.CoverBoxFooter>
      </S.Layout>
    </S.RootContainer>
  )
}

export default ClosetCoverBox
