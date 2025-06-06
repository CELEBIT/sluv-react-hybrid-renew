import styled from '@emotion/styled'
import { ReactComponent as Album } from '../../assets/BottomModal/album_24.svg'
import { ReactComponent as Default } from '../../assets/BottomModal/cover_24.svg'
import { ReactComponent as Edit } from '../../assets/BottomModal/pencil_24.svg'
import { ReactComponent as Delete } from '../../assets/BottomModal/trashCan_24.svg'
import { ReactComponent as ShareIcon } from '../../assets/share_24.svg'

import Header from '../Header/Header'
import useModals from '../Modals/hooks/useModals'
import BottomSheetModal from './index'
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
              {item.title === '앨범에서 사진 선택' ? (
                <Album />
              ) : item.title === '기본 커버 선택' ? (
                <Default />
              ) : item.title === '옷장 수정하기' ? (
                <Edit />
              ) : item.title === '옷장 삭제하기' ? (
                <Delete />
              ) : item.title === '옷장 만들기' ? (
                <Album />
              ) : (
                <ShareIcon />
              )}
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
