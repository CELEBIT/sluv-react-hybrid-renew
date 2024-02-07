import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const TabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 2.75rem;
`
export const Tab = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.75rem 0;
`
export const TabName = styled.span<{ active: boolean }>`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  color: ${({ active }) => (active ? Common.colors.BK : Common.colors.GR500)};
`
export const TabIndicator = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ active }) => (active ? '2px' : '1px')};
  background-color: ${({ active }) => (active ? Common.colors.BK : Common.colors.GR200)};
  transition: cubic-bezier(1, 0, 0, 1);
`
