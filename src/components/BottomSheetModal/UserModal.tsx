import React from 'react'
import BottomSheetModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import Header from '../Header/Header'

import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ShareIcon } from '../../assets/share_24.svg'
import Share from '../../utils/Share/share'

export interface UserModalProps {
  userName: string
}

const UserModal = ({ userName }: UserModalProps) => {
  const navigate = useNavigate()
  const { closeModal } = useModals()

  const onClickShareUser = () => {
    closeModal(modals.UserModal, () => {
      navigate('/community/detail/report-question')
    })
  }
  const onClickReportUser = () => {
    closeModal(modals.UserModal, () => {
      navigate('/user/report-user')
    })
  }
  // 공유하기
  const handleShare = async () => {
    const result = await Share()
    if (result === 'copiedToClipboard') {
      alert('링크를 클립보드에 복사했습니다.')
    } else if (result === 'failed') {
      alert('공유하기가 지원되지 않는 환경입니다.')
    }
    closeModal(modals.UserModal)
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={() => closeModal(modals.UserModal)} />
        <MenuWrapper>
          <Menu onClick={handleShare}>
            <ShareIcon stroke={Common.colors.BK}></ShareIcon>&apos;{userName}&apos;님 프로필
            공유하기
          </Menu>
          <Menu onClick={onClickReportUser}>
            <ShareIcon stroke={Common.colors.BK}></ShareIcon>
            &apos;{userName}&apos;님 신고하기
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

export default UserModal
