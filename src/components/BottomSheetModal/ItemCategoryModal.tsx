import styled from '@emotion/styled'
import React from 'react'
import BottomSheetModal from '.'
import useItemCategoryQuery from '../../apis/item/hooks/useItemCategoryQuery'
import Header from '../Header/Header'

const ItemCategoryModal = () => {
  const {
    getItemCategory: { data, error },
  } = useItemCategoryQuery()
  console.log(data)
  console.log(error)

  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header isModalHeader={true} title={'아이템 종류'} />
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
