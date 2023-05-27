import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'

const UserReportCompleteModal = () => {
  const { closeModal } = useModals()
  const requestedItem = useRecoilValue(RequestEditItemState)
  const navigate = useNavigate()
  const onComplete = () => {
    closeModal(modals.UserReportCompleteModal, () =>
      navigate('/item/detail/' + requestedItem.itemId),
    )
  }
  return (
    <OneButtonModal buttonName='확인' buttonOnClick={onComplete}>
      <BtnModalContent>
        해당 사용자의 활동을 확인할게요 <br />
        조금만 기다려 주세요!
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default UserReportCompleteModal
