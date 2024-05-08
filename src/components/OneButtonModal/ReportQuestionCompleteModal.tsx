import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'

const ReportQuestionCompleteModal = () => {
  const { closeModal } = useModals()
  const location = useLocation()
  const requestedItem = useRecoilValue(RequestEditItemState)
  const resetRequestedItem = useResetRecoilState(RequestEditItemState)
  console.log(RequestEditItemState)
  const navigate = useNavigate()
  const onComplete = () => {
    closeModal(modals.ReportQuestionCompleteModal, () => {
      navigate('/community/detail/' + requestedItem.itemId, { replace: true })
      resetRequestedItem
    })
  }
  return (
    <OneButtonModal buttonName='확인' buttonOnClick={onComplete}>
      <BtnModalContent>
        스럽 팀에 신고가 접수되었어요
        <br />
        조금만 기다려 주세요!
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default ReportQuestionCompleteModal
