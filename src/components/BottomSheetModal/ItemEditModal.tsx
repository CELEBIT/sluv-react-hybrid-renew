import styled from '@emotion/styled'
import BottomSheetModal from '.'

// import { atomKeys } from '../../config/atomKeys'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Edit } from '../../assets/BottomModal/pencil_24.svg'
import { ReactComponent as Delete } from '../../assets/BottomModal/trashCan_24.svg'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { Common, Pretendard } from '../styles'

export interface ItemEditModalProps {
  itemId: number
}

const ItemEditModal = ({ itemId }: ItemEditModalProps) => {
  const navigate = useNavigate()
  const { openModal, closeModal } = useModals()

  const onClickEdit = () => {
    closeModal(modals.ItemEditModal, () => {
      navigate(`/item/edit/${itemId}`)
    })
  }

  const onClickDeleteItem = () => {
    closeModal(modals.ItemEditModal, () => {
      openModal(modals.DeleteItemModal, { itemId: itemId })
    })
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} modalCloseBtnClick={() => closeModal(modals.ItemEditModal)} />
        <MenuWrapper>
          <Menu onClick={onClickEdit}>
            <Edit stroke={Common.colors.BK}></Edit>게시글 수정하기
          </Menu>
          <Menu onClick={onClickDeleteItem}>
            <Delete stroke={Common.colors.BK}></Delete>게시글 삭제하기
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

export default ItemEditModal
