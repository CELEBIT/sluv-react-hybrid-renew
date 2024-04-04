import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useNavigate } from 'react-router-dom'
import storage from '../../utils/storage'

const ConfirmWithdrawModal = () => {
  const { closeModal } = useModals()
  const navigate = useNavigate()
  const onClose = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      closeModal(modals.ConfirmWithdrawModal, () => {
        storage.clear()
      })
      window.webkit.messageHandlers.IOSBridge.postMessage(
        JSON.stringify({
          type: 'withdraw',
        }),
      )
    } else {
      closeModal(modals.ConfirmWithdrawModal, () => {
        storage.clear()
        navigate('/')
      })
    }
  }

  return (
    <OneButtonModal buttonName='확인' buttonOnClick={() => onClose()}>
      <BtnModalContent>
        탈퇴처리가 완료되었어요 <br />
        다음에 다시 만나요!
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default ConfirmWithdrawModal
