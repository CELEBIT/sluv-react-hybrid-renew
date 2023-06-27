import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../styles'

const Field = styled.div`
  display: flex;
  flex-direction: row;
  text-overflow: ellipsis;
  align-items: center;
  background-color: white;
  height: 3.1875rem;
  flex-shrink: none;
  width: 100%;
  padding: 0 1rem;
  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
  }
`

export const Menu = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;
  flex-shrink: none;
`

export const DropDownContainer = styled.div<{ position?: string; top?: number }>`
  display: flex;
  position: absolute;
  top: ${(props) => (props.top ? `${props.top * 0.0625}rem` : '3.125rem')};
  flex-direction: column;
  justify-content: center;
  width: 10rem;
  border-radius: 0.75rem;
  box-shadow: 0px 2px 17px rgba(199, 206, 212, 0.5);
  z-index: 20;
`

export const SingleField = styled(Field)`
  border-radius: 0.75rem;
  padding: 0 1.25rem;
`

export const FirstField = styled(Field)`
  border-radius: 0.75rem 0.75rem 0 0;
`

export const MiddleField = styled(Field)``

export const LastField = styled(Field)`
  border-top: 1px solid ${Common.colors.GR300};
  border-radius: 0 0 0.5rem 0.5rem;
`
