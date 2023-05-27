import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'

const DuplicateReportModal = () => {
  const { closeModal } = useModals()

  return (
    <OneButtonModal buttonName='확인' buttonOnClick={() => closeModal(modals.DuplicateReportModal)}>
      <BtnModalContent>
        이미 신고가 접수되었어요 <br />
        조금만 기다려 주세요
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default DuplicateReportModal
