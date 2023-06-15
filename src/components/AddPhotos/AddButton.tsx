import React from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'
import { ReactComponent as Add } from '../../assets/add_18.svg'

type AddButtonProps = {
  itemCnt: number
  onClick: any
}

const AddButton = ({ itemCnt, onClick }: AddButtonProps) => {
  return (
    <AddPhotoWrapper onClick={() => onClick()}>
      <Add />
      <span>({itemCnt}/5)</span>
    </AddPhotoWrapper>
  )
}

export default AddButton

const AddPhotoWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4.625rem;
  height: 4.625rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  background-color: white;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
