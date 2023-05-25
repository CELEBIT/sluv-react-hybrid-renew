import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'

import { useRecoilValue } from 'recoil'
// import { atomKeys } from '../../config/atomKeys'
import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'
import { RequestEditItemState } from '../../pages/item/editRequest'

const ItemEditRequestModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModals()
  const onClickEditRequest = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/request-edit')
    })
  }
  const onClickReportItem = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/report-item')
    })
  }
  const onClickReportUser = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/report-user')
    })
  }
  const EditReportItem = useRecoilValue(RequestEditItemState)
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemEditRequestModal)}
        />
        <MenuWrapper>
          <Menu onClick={onClickEditRequest}>정보 수정 요청하기</Menu>
          <Menu onClick={onClickReportItem}>게시글 신고하기</Menu>
          <Menu onClick={onClickReportUser}>
            &apos;{EditReportItem.itemWriterName}&apos;님 신고하기
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
  padding: 0 1.25rem 0.75rem 20px;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  padding-bottom: 1rem;
`

const Menu = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default ItemEditRequestModal
