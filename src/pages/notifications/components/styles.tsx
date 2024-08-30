import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const Layout = styled.label<{ isRead: boolean; isEditMode: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  gap: 1rem;
  /* border: 1px solid red; */
  opacity: ${(props) => props.isRead && !props.isEditMode && '30%'};
`
export const LeftLayout = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
`

export const CenterLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  /* background-color: yellow; */
`
export const RightLayout = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  border-radius: 0.25rem;
`
export const TitleText = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  word-break: keep-all;
`
export const TimeText = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
export const Checkbox = styled.div`
  input[type='checkbox'] {
    -webkit-appearance: none;
    display: none;
  }
  /* margin-right: 1.0625rem; */
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
