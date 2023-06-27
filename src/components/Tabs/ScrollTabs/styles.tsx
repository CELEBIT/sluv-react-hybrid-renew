import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'

export const ScrollTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex-shrink: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  border-bottom: 1px solid ${Common.colors.GR200};
`
export const Tab = styled.div`
  display: flex;
  position: relative;
  flex-shrink: 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 44px;
`
export const TabName = styled.span<{ active: boolean }>`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  color: ${({ active }) => (active ? Common.colors.BK : Common.colors.GR500)};
`
export const TabIndicator = styled.div<{ active: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ active }) => (active ? '0.125rem' : '0')};
  background-color: ${({ active }) => (active ? Common.colors.BK : Common.colors.GR200)};
  transition: cubic-bezier(1, 0, 0, 1);
`
