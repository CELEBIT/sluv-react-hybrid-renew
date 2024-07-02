import React from 'react'
import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import useQuestionDetailQuery from '../../apis/question/hooks/useQuestionDetailQuery'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'
import { useNavigate } from 'react-router-dom'
import { communityItemState } from '../../recoil/communityInfo'
import storage from '../../utils/storage'

const LogoutModal = () => {
  const { closeModal } = useModals()
  const navigate = useNavigate()

  const onLogout = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      closeModal(modals.LogoutModal, () => {
        storage.clear()
      })
      window.webkit.messageHandlers.IOSBridge.postMessage(
        JSON.stringify({
          type: 'logout',
        }),
      )
    } else if (window.ReactNativeWebView) {
      closeModal(modals.LogoutModal, () => {
        storage.clear()
      })
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'logout',
        }),
      )
    } else {
      closeModal(modals.LogoutModal, () => {
        storage.clear()
        navigate('/')
      })
    }
  }

  return (
    <TwoButtonModal
      leftButtonName='취소'
      rightButtonName='로그아웃'
      leftButtonOnClick={() => closeModal(modals.LogoutModal)}
      rightButtonOnClick={onLogout}
    >
      <BtnModalContent>
        스럽에서 정말
        <br />
        로그아웃 하실건가요?
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default LogoutModal
