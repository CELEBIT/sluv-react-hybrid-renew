import React, { EventHandler, HTMLAttributes, MouseEventHandler, useState } from 'react'
import * as S from './styles'
import { ClosetItemModel } from '../../../../apis/closet/model'
import { ReactComponent as CheckOffIcon } from '../../../../assets/checkbox_off_32.svg'
import { ReactComponent as CheckOnIcon } from '../../../../assets/checkbox_on_32.svg'
import { useNavigate } from 'react-router-dom'

type ClosetInnerItemProps = {
  service: ClosetItemModel
  isEditMode: boolean
  onSelectItem?(id: ClosetItemModel['itemId'], nextSelectState: boolean): void
}

type CheckBoxProps = HTMLAttributes<HTMLDivElement> & {
  isSelected: boolean
}

const CheckBox = ({ isSelected, ...rest }: CheckBoxProps) => {
  return (
    <S.CheckBoxContainer {...rest}>
      {isSelected ? <CheckOnIcon /> : <CheckOffIcon />}
    </S.CheckBoxContainer>
  )
}
const ClosetInnerItem = ({ service, isEditMode, onSelectItem }: ClosetInnerItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleClickCheckBox: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isEditMode) {
      const nextSelectState = !isSelected
      setIsSelected(nextSelectState)
      onSelectItem?.(service.itemId, nextSelectState)
    }
  }

  const handleMoveItemDetail = () => {
    navigate(`/item/detail/${service.itemId}`)
  }

  return (
    <S.Root onClick={handleMoveItemDetail}>
      <S.Layout>
        <S.ImageContainer>
          <img alt={'아이템 이미지'} src={service.imgUrl ?? ''} />
          {isEditMode && <CheckBox isSelected={isSelected} onClick={handleClickCheckBox} />}
        </S.ImageContainer>

        <S.DescContainer>
          <h4>{service.celebName}</h4>
          <h5>{service.brandName}</h5>
          <h5>{service.itemName}</h5>
        </S.DescContainer>
      </S.Layout>
    </S.Root>
  )
}

export default ClosetInnerItem
