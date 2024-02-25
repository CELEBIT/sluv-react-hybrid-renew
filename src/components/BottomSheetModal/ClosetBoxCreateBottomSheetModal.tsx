import React from 'react'
import BottomSheetModal from './index'
import styled from '@emotion/styled'
import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import { ReactComponent as ShareIcon } from '../../assets/share_24.svg'

export interface ClosetBoxBottomSheetListItem {
  title: string
  callback: (...arg: any) => void
}

type ClosetBoxBottomSheetModalProps = {
  items?: ClosetBoxBottomSheetListItem[]
  title: string
}

const ClosetBoxCreateBottomSheetModal = ({ items, title }: ClosetBoxBottomSheetModalProps) => {
  const { closeModal } = useModals()

  const handleCloseModal = () => {
    closeModal(ClosetBoxCreateBottomSheetModal)
  }

  return (
    <BottomSheetModal>
      <HeaderWrapper>
        <Header modalCloseBtnClick={handleCloseModal} isModalHeader={true} title={title} />
      </HeaderWrapper>
      <ModalContentContainer>
        {items?.map((item) => {
          return (
            <ItemContainer key={item.title}>
              <ShareIcon stroke={'black'} />
              <ItemTitle onClick={item.callback}>{item.title}</ItemTitle>
            </ItemContainer>
          )
        })}
      </ModalContentContainer>
    </BottomSheetModal>
  )
}

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 34px;
`

const ItemContainer = styled.div`
  display: flex;
  padding: 14px 32px;
  align-items: center;
  width: 100%;
  gap: 10px;
`

const ItemTitle = styled.p`
  display: block;
  height: 100%;
  font-family: 'Pretendard';
  font-size: 17px;
  font-weight: 500;
  margin: 0;
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.25rem;
`

export default ClosetBoxCreateBottomSheetModal
