import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from '@emotion/styled'

import BottomSheetModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'

import { Common, Pretendard } from '../styles'

import { ChipWrapper } from './ItemBrandSelectModal'
import { ButtonWrapper } from './ItemPlaceInputModal'
import Header from '../Header/Header'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { selectedCelebState, selectedGroupState } from '../SelectCeleb/SelectCeleb'

const ItemCelebSelectModal = () => {
  const selectedGroup = useRecoilValue(selectedGroupState)
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const { closeModal } = useModals()
  const onClose = () => {
    setSelectedCeleb({ id: 0, celebNameKr: '' })
    closeModal(modals.ItemCategoryModal)
  }
  const onComplete = () => {
    console.log(selectedCeleb)
    closeModal(modals.ItemCategoryModal)
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header title='셀럽선택' isModalHeader={true} modalCloseBtnClick={onClose} />
        </div>
        <SelectWrapper>
          <span className='GroupName'>{selectedGroup.celebNameKr}</span>
          <MemberWrapper>
            {selectedGroup.subCelebList.map((celeb) => {
              return (
                <ButtonMedium
                  key={celeb.id}
                  text={celeb.celebNameKr}
                  type='pri'
                  active={selectedCeleb === celeb}
                  onClick={() => setSelectedCeleb(celeb)}
                ></ButtonMedium>
              )
            })}
          </MemberWrapper>
          <ChipWrapper></ChipWrapper>
        </SelectWrapper>
        <ButtonWrapper>
          <ButtonLarge
            text='완료'
            active={selectedCeleb.celebNameKr !== ''}
            onClick={onComplete}
          ></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCelebSelectModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .Header {
    padding: 0 1.25rem;
  }
  .long {
    height: 34.875rem;
  }
`
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-bottom: 1.25rem;
  .GroupName {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`

const MemberWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.25rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`
