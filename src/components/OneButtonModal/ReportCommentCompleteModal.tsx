import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'

const ReportCommentCompleteModal = () => {
  const { closeModal } = useModals()
  const requestedItem = useRecoilValue(RequestEditItemState)
  const resetRequestedItem = useResetRecoilState(RequestEditItemState)
  const navigate = useNavigate()
  const onComplete = () => {
    closeModal(modals.ReportCommentCompleteModal, () => {
      resetRequestedItem()
      navigate('/community/detail/' + requestedItem.questionId)
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

export default ReportCommentCompleteModal
