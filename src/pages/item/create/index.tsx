import React from 'react'
import { modals } from '../../../components/Modals'
import useModals from '../../../components/Modals/hooks/useModals'

const ItemCreate = () => {
  const { openModal } = useModals()

  const test = () => {
    console.log('test')
    openModal(modals.AskRecentPostWritingModal, {})
  }

  return (
    <div onClick={test} style={{ padding: '20px' }}>
      <div>ItemCreate</div>
    </div>
  )
}

export default ItemCreate
