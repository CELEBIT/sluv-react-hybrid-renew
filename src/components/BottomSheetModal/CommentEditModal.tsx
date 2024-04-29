import React, { useEffect } from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'

import { useRecoilValue, useResetRecoilState } from 'recoil'
// import { atomKeys } from '../../config/atomKeys'
import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'
import { RequestEditItemState } from '../../pages/item/editRequest'
import { ReactComponent as Share } from '../../assets/share_24.svg'
import { commentState } from '../../pages/community/detail/CommunityDetail'

export interface CommentEditModalProps {
  commentId: number
  questionId: number
}

const CommentEditModal = ({ commentId, questionId }: CommentEditModalProps) => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModals()
  const resetCommentObject = useResetRecoilState(commentState)

  const onClickEdit = () => {
    closeModal(modals.CommentEditModal, () => {
      navigate('/community/comment/edit')
    })
  }

  const onClickDeleteItem = () => {
    closeModal(modals.CommentEditModal, () => {
      openModal(modals.DeleteCommentModal, { commentId, questionId })
    })
  }

  const onClose = () => {
    resetCommentObject()
    closeModal(modals.ItemEditRequestModal)
  }

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={onClose} />
        <MenuWrapper>
          <Menu onClick={onClickEdit}>
            <Share stroke={Common.colors.BK}></Share>댓글 수정하기
          </Menu>
          <Menu onClick={onClickDeleteItem}>
            <Share stroke={Common.colors.BK}></Share>댓글 삭제하기
          </Menu>
        </MenuWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem 0.75rem 2rem;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 0.875rem 0;
  gap: 0.625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default CommentEditModal
