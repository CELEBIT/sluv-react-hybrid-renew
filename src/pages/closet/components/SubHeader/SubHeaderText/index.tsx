import useModals from '../../../../../components/Modals/hooks/useModals'
import { useNavigate } from 'react-router-dom'
import ClosetBoxCreateBottomSheetModal, {
  ClosetBoxBottomSheetListItem,
} from '../../../../../components/BottomSheetModal/ClosetBoxCreateBottomSheetModal'
import React, { useCallback, useMemo } from 'react'
import * as S from './styles'

export const ClosetMainSubHeaderEditText = () => {
  const { openModal, closeModal } = useModals()
  const navigate = useNavigate()

  const SELECT_COVER_IMAGE_MODAL_ITEMS: ClosetBoxBottomSheetListItem[] = useMemo(
    () => [
      {
        title: '옷장 만들기',
        callback: () => {
          closeModal(ClosetBoxCreateBottomSheetModal, () => navigate('/closet/create'))
        },
      },
      // {
      //   title: '옷장 정렬 및 삭제',
      //   callback: () => {
      //     closeModal(ClosetBoxCreateBottomSheetModal, () => navigate('/closet/deleteAndSort'))
      //   },
      // },
    ],
    [],
  )

  const handleOpenSelectCoverModal = useCallback(() => {
    openModal(ClosetBoxCreateBottomSheetModal, {
      items: SELECT_COVER_IMAGE_MODAL_ITEMS,
      title: '커버 이미지 선택',
    })
  }, [])

  return <S.SubHeaderEditText onClick={handleOpenSelectCoverModal}>편집</S.SubHeaderEditText>
}
