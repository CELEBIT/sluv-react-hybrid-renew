import TwoButtonModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import { BtnModalContent } from '../Modals/styles'
import { useNavigate } from 'react-router-dom'
import { appStoreURL } from '../../config/constant'

const LoginToContinueModal = () => {
  const { closeModal } = useModals()
  const navigate = useNavigate()

  const onLogin = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      closeModal(modals.LoginToContinueModal, () => {
        window.webkit.messageHandlers.IOSBridge.postMessage(
          JSON.stringify({
            type: 'needLogin',
          }),
        )
      })
    } else {
      closeModal(modals.LoginToContinueModal, () => (window.location.href = appStoreURL))
    }
  }

  return (
    <TwoButtonModal
      leftButtonName='둘러보기'
      rightButtonName='로그인'
      leftButtonOnClick={() => closeModal(modals.LoginToContinueModal)}
      rightButtonOnClick={onLogin}
    >
      <BtnModalContent>
        로그인 후 이용할 수 있어요
        <br />
        스럽에서 활동을 시작해 볼까요?
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default LoginToContinueModal
