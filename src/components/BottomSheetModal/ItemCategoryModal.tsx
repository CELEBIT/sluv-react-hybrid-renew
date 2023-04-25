import styled from '@emotion/styled'
import React from 'react'
import BottomSheetModal from '.'
import useItemCategoryQuery from '../../apis/item/hooks/useItemCategoryQuery'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'

const ItemCategoryModal = () => {
  const { closeModal } = useModals()

  const {
    getItemCategory: { data },
  } = useItemCategoryQuery()
  console.log(data)

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          title={'아이템 종류'}
          modalCloseBtnClick={() => closeModal(modals.ItemCategoryModal)}
        />
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCategoryModal

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;
`
