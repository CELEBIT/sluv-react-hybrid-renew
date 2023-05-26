import React from 'react'
import OneButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'

const EditRequestCompleteMOdal = () => {
  const { closeModal } = useModals()

  return (
    <OneButtonModal
      buttonName='확인'
      buttonOnClick={() => closeModal(modals.EditRequestCompleteModal)}
    >
      <BtnModalContent>
        수정이 요청되었어요! <br />
        정보의 질을 높여주셔서 감사해요
      </BtnModalContent>
    </OneButtonModal>
  )
}

export default EditRequestCompleteMOdal
