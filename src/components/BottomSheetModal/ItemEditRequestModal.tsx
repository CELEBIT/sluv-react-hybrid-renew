import React from 'react'
import BottomSheetModal from '.'
import styled from '@emotion/styled'

import { useNavigate } from 'react-router-dom'
import { atom, useRecoilValue } from 'recoil'
import { atomKeys } from '../../config/atomKeys'
import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { Common, Pretendard } from '../styles'

interface EditRequestItem {
  itemId: number
  itemWriterId: number | undefined
  itemWriterName: string | undefined
}

export const EditRequestItemState = atom<EditRequestItem>({
  key: atomKeys.requestEditItemState,
  default: { itemId: 0, itemWriterId: 0, itemWriterName: '' },
})

const ItemEditRequestModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModals()
  const onClickEditRequest = () => {
    navigate('/item/detail/request/edit')
    closeModal(modals.ItemEditRequestModal)
  }
  const onClickReportItem = () => {
    closeModal(modals.ItemEditRequestModal)
    navigate('/item/detail/report-item')
  }
  const onClickReportUser = () => {
    closeModal(modals.ItemEditRequestModal)
    navigate('/item/detail/report-user')
  }
  const EditReportItemState = useRecoilValue(EditRequestItemState)
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemEditRequestModal)}
        />
        <MenuWrapper>
          <span onClick={onClickEditRequest}>정보 수정 요청하기</span>
          <span onClick={onClickReportItem}>게시글 신고하기</span>
          <span onClick={onClickReportUser}>
            &apos;{EditReportItemState.itemWriterName}&apos;님 신고하기
          </span>
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
  span {
    ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
  }
`

export default ItemEditRequestModal
