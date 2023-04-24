import React from 'react'
import { modals } from '../../../components/Modals'
import useModals from '../../../components/Modals/hooks/useModals'

const ItemCreate = () => {
  const { openModal } = useModals()

  return <div onClick={() => openModal(modals.ItemCategoryModal)}>ItemCreate</div>
}

export default ItemCreate
