import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { ReactComponent as Add } from '../../assets/add_18.svg'
import { Common, Pretendard } from '../styles'

type AddButtonProps = {
  itemCnt: number
  onClick: () => void
  size?: number
  children?: ReactNode
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
