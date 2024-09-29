import React from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import { ReactComponent as Add } from '../../assets/add_18.svg'

type AddButtonProps = {
  itemCnt: number
  onClick: any
  size?: number
  children?: any
}

const AddButton = ({ itemCnt, onClick, size, children }: AddButtonProps) => {
  return (
    <AddPhotoWrapper size={size} onClick={() => onClick()}>
      <Add />
      <span>({itemCnt}/5)</span>
      {children}
    </AddPhotoWrapper>
  )
}

export default AddButton

const AddPhotoWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '4.625rem')};
  height: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '4.625rem')};
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  background-color: white;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
