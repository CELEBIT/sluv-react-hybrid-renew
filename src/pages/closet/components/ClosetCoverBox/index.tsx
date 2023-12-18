import React from 'react'
import * as S from './styles'
import NameTag from '../NameTag'
import { ClosetBoxService } from '../../services'
import ClosetBoxGrabIcon from '../GrabIcon'
import { useNavigate } from 'react-router-dom'

export type ClosetCoverBoxProps = {
  service: ClosetBoxService
  editMode?: boolean
  handleClickBox?: () => void
}

const ClosetCoverBox = ({ service, editMode = false, handleClickBox }: ClosetCoverBoxProps) => {
  const navigate = useNavigate()

  const handleForwardDetailPage = () => {
    if (handleClickBox) {
      console.log('asd')
      handleClickBox()
      return
    }
    navigate(`/closet/detail?id=${service.id}`)
  }

  return (
    <S.RootContainer onClick={handleForwardDetailPage}>
      <S.Layout closetBox={service}>
        <S.CoverBoxHeader>
          <NameTag service={{ closetBox: service, editMode }} />
        </S.CoverBoxHeader>
        <S.CoverBoxBody service={service}>
          {!(service.coverImgUrl && service.coverImgUrl.length > 0) && (
            <ClosetBoxGrabIcon
              coverBoxColor={service.colorScheme}
              coverImageMode={service.coverImageMode}
            />
          )}
        </S.CoverBoxBody>
        <S.CoverBoxFooter>{service.itemNum}</S.CoverBoxFooter>
      </S.Layout>
    </S.RootContainer>
  )
}

export default ClosetCoverBox
