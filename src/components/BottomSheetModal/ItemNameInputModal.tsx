import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import useModals from '../Modals/hooks/useModals'
import { modals } from '../Modals'
import BottomSheetModal from '.'
import Header from '../Header/Header'
import DefaultTextfield from '../TextField/DefaultTextfield/DefaultTextfield'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../recoil/itemInfo'

const ItemNameInputModal = () => {
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const [inputValue, setInputValue] = useState<string>((itemInfo.itemName as string) || '')
  const { closeModal } = useModals()

  const onSetItemName = (itemName: string) => {
    setItemInfo({
      ...itemInfo,
      itemName,
    })
    closeModal(modals.ItemDatePickerModal)
  }
  const onClose = () => {
    setItemInfo({
      ...itemInfo,
      itemName: inputValue,
    })
    closeModal(modals.ItemDatePickerModal)
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [inputRef])
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          title='상품명 입력'
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemCategoryModal)}
        />
        <div className='ContentWrapper'>
          <DefaultTextfield
            value={inputValue}
            setValue={setInputValue}
            onEnter={() => onSetItemName(inputValue)}
            placeholder='상품명을 입력해 주세요'
          ></DefaultTextfield>
          <ButtonLarge text='완료' active={true} onClick={onClose}></ButtonLarge>
        </div>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemNameInputModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem 0.75rem 20px;
  .ContentWrapper {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
  }
`
