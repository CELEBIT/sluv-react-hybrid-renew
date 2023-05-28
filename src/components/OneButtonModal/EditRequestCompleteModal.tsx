import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { RequestEditItemState } from '../../pages/item/editRequest'

const EditRequestCompleteMOdal = () => {
  const { closeModal } = useModals()
  const requestedItem = useRecoilValue(RequestEditItemState)
  const navigate = useNavigate()
  const onComplete = () => {
    closeModal(modals.EditRequestCompleteModal, () =>
      navigate('/item/detail/' + requestedItem.itemId),
    )
  }
  return (
    <OneButtonModal buttonName='확인' buttonOnClick={onComplete}>
      <BtnModalContent>
        수정이 요청되었어요! <br />
        정보의 질을 높여주셔서 감사해요
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default EditRequestCompleteMOdal
