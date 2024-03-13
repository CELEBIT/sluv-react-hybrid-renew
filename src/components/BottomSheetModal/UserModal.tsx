import React from 'react'
import BottomSheetModal from '.'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import Header from '../Header/Header'

import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Share } from '../../assets/share_24.svg'

interface UserModalProps {
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
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={() => closeModal(modals.UserModal)} />
        <MenuWrapper>
          <Menu onClick={onClickShareUser}>
            <Share stroke={Common.colors.BK}></Share>&apos;{userName}&apos;님 프로필 공유하기
          </Menu>
          <Menu onClick={onClickReportUser}>
            <Share stroke={Common.colors.BK}></Share>
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
