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
import { ReactComponent as Share } from '../../assets/share_24.svg'

const ItemEditRequestModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModals()
  const onClickEditRequest = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/request-deleteAndSort')
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
          <Menu onClick={onClickEditRequest}>
            <Share stroke={Common.colors.BK}></Share>정보 수정 요청하기
          </Menu>
          <Menu onClick={onClickReportItem}>
            <Share stroke={Common.colors.BK}></Share>게시글 신고하기
          </Menu>
          <Menu onClick={onClickReportUser}>
            <Share stroke={Common.colors.BK}></Share>
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

export default ItemEditRequestModal
