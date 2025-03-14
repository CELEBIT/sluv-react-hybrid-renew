import React from 'react'
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

const CommentReportModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModals()
  const resetCommentObject = useResetRecoilState(commentState)

  const onClickReportUser = () => {
    closeModal(modals.CommentReportModal, () => {
      navigate('/community/comment/report-comment')
      resetCommentObject()
    })
  }
  const EditReportItem = useRecoilValue(RequestEditItemState)
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          modalCloseBtnClick={() =>
            closeModal(modals.CommentReportModal, () => {
              resetCommentObject()
            })
          }
        />
        <MenuWrapper>
          <Menu onClick={onClickReportUser}>
            <Share stroke={Common.colors.BK}></Share>
            {EditReportItem.itemWriterName}님의 댓글 신고하기
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

export default CommentReportModal
