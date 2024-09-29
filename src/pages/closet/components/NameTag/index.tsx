import React, { forwardRef, useCallback, useMemo } from 'react'
import * as S from './NameTag.styles'

import { SideDotsIcon, LockIcon } from './NameTag.styles'
import ToolTip from '../../../../components/ToolTip/ToolTip'
import NameTagEditIcon from '../../../../assets/closet_name_tag_edit_icon.svg'
import { useNameTag } from './hooks'
import { ClosetBoxService, NameTagService } from '../../services'
import useModals from '../../../../components/Modals/hooks/useModals'
import { useNavigate } from 'react-router-dom'
import ClosetBoxCreateBottomSheetModal, {
  ClosetBoxBottomSheetListItem,
} from '../../../../components/BottomSheetModal/ClosetBoxCreateBottomSheetModal'

import { ReactComponent as SideArrayIcon } from '../../../../assets/array_24.svg'
import { DeleteReCheckModal } from '../../deleteAndSort'
import { ClosetBoxModel } from '../../../../apis/closet/model'
import { deleteCloset } from '../../../../apis/closet'
import { useQueryClient } from '@tanstack/react-query'

export type NameTagProps = { service: NameTagService }

const NameTag = forwardRef<HTMLInputElement, NameTagProps>(function RenderNameTag(
  { service },
  ref,
) {
  const { closetBox, editMode, onSave, isSortingLocation = false } = service
  const {
    handlers: { handleChangeInputValue, handleFocus, handleFocusOut, handleClick },
    states: { showTooltipValidation, tooltipText, nameText },
  } = useNameTag({ onSave, closetBox, editMode })

  return (
    <S.RootContainer onClick={handleClick}>
      <S.Layout colorScheme={closetBox.colorScheme}>
        <S.TitleWrapper>
          {editMode ? (
            <>
              <S.NameTagEditInput
                onBlur={handleFocusOut}
                onFocus={handleFocus}
                onChange={handleChangeInputValue}
                ref={ref}
                placeholder={'옷장 이름을 입력해 주세요'}
                value={nameText}
                type='text'
              />
              <ToolTip
                left={'-250px'}
                top={'20px'}
                arrowPosition={'top-left'}
                isVisible={showTooltipValidation}
              >
                {tooltipText}
              </ToolTip>
            </>
          ) : (
            closetBox.name
          )}
        </S.TitleWrapper>
        <S.IconContainer>
          {!isSortingLocation && closetBox.closetStatus === 'PRIVATE' && (
            <SideLockIcon editMode={editMode} />
          )}
          {!isSortingLocation && Number(closetBox.id) !== 1 && (
            <NameTagSideDotsIcon closetBox={closetBox} editMode={editMode} />
          )}
          {isSortingLocation && <SideArrayIcon />}
        </S.IconContainer>
      </S.Layout>
    </S.RootContainer>
  )
})

type LockIconProps = {
  editMode: boolean
}
export const SideLockIcon = ({ editMode }: LockIconProps) => {
  return <LockIcon editMode={editMode} />
}

type AddIconProps = {
  editMode: boolean
  closetBox: ClosetBoxService
}
export const NameTagSideDotsIcon = ({ editMode, closetBox }: AddIconProps) => {
  const { openModal, closeModal } = useModals()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDeleteCloset = (id: ClosetBoxModel['id']) => {
    openModal(DeleteReCheckModal, {
      handleCancel: () => {
        closeModal(DeleteReCheckModal)
      },
      handleConfirm: async () => {
        const serialized = Number(id)
        const res = await deleteCloset(serialized)
        closeModal(DeleteReCheckModal)
        await queryClient.refetchQueries({ queryKey: ['get', 'closet', 'list'], exact: false })
        navigate('/closet')
      },
    })
  }

  const SELECT_COVER_IMAGE_MODAL_ITEMS: ClosetBoxBottomSheetListItem[] = useMemo(
    () => [
      {
        title: '옷장 수정하기',
        callback: () => {
          closeModal(ClosetBoxCreateBottomSheetModal, () =>
            navigate(
              `/closet/edit?id=${closetBox.id}&name=${closetBox.name}&coverImgUrl=${
                closetBox.coverImgUrl
              }&closetStatus=${closetBox.closetStatus}&colorScheme=${
                closetBox.colorScheme
              }&itemNum=${closetBox.itemNum}&coverImageMode=${
                closetBox.coverImageMode
                  ? closetBox.coverImageMode
                  : closetBox.coverImgUrl?.length !== 0
                  ? 'IMAGE'
                  : 'DEFAULT'
              }`,
            ),
          )
        },
      },
      {
        title: '옷장 삭제하기',
        callback: () => {
          closeModal(ClosetBoxCreateBottomSheetModal, () => handleDeleteCloset(closetBox.id))
        },
      },
    ],
    [closetBox],
  )

  const handleOpenSelectCoverModal = useCallback(() => {
    openModal(ClosetBoxCreateBottomSheetModal, {
      items: SELECT_COVER_IMAGE_MODAL_ITEMS,
      title: '커버 이미지 선택',
    })
  }, [])

  return <SideDotsIcon onClick={handleOpenSelectCoverModal} editMode={editMode} />
}

type EditIconProps = {
  testProps?: any
}
export const SideEditIcon = ({}: EditIconProps) => {
  return <NameTagEditIcon />
}

export default NameTag
