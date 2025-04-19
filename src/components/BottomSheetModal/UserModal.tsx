import BottomSheetModal from '.'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'

import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Share from '../../utils/Share/share'
import { Common, Pretendard } from '../styles'

export interface UserModalProps {
  userName: string
  userId: number
  blockStatus: boolean
}

const UserModal = ({ userName, userId, blockStatus }: UserModalProps) => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModals()

  // 공유하기
  const handleShare = async () => {
    const result = await Share()
    if (result === 'copiedToClipboard') {
      toast('링크를 클립보드에 복사했습니다.')
    } else if (result === 'failed') {
      toast('공유하기가 지원되지 않는 환경입니다.')
    }
    closeModal(modals.UserModal)
  }
  const onClickReportUser = () => {
    closeModal(modals.UserModal, () => {
      navigate('/user/report-user')
    })
  }
  const onBlockUser = () => {
    closeModal(modals.UserModal, () => {
      openModal(modals.BlockUserModal, { userId: userId, blockStatus: blockStatus })
    })
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={() => closeModal(modals.UserModal)} />
        <MenuWrapper>
          {blockStatus ? (
            <Menu onClick={onBlockUser}>&apos;{userName}&apos;님 차단 해제하기</Menu>
          ) : (
            <>
              <Menu onClick={handleShare}>&apos;{userName}&apos;님 프로필 공유하기</Menu>
              <Menu onClick={onClickReportUser}>&apos;{userName}&apos;님 신고하기</Menu>
              <Menu onClick={onBlockUser}>&apos;{userName}&apos;님 차단하기</Menu>
            </>
          )}
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

export default UserModal
