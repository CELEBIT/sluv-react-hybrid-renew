import styled from 'styled-components'
import { Common } from '../../../../../components/styles'

export const DatePlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5.375rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: 0.0625rem solid ${Common.colors.GR200};
  font-family: 'Pretendard';
`

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 5rem;
  height: 2.75rem;
`
export const PlaceWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  height: 2.75rem;
  width: 100%;
`

export const Line = styled.div`
  width: 0.0625rem;
  height: 4.125rem;
  background: #dfe2e6;
  margin: 0 1.25rem;
`

export const Title = styled.span`
  margin: 0;
  font-weight: 500;
  font-size: 0.9375rem;
  color: ${Common.colors.GR600};
`
export const ValueText = styled.span<{
  isEmpty?: boolean
}>`
  margin: 0;
  font-weight: 400;
  font-size: 1.0625rem;
  color: ${Common.colors.BK};
  ${({ isEmpty }) =>
    isEmpty &&
    `
      color: ${Common.colors.GR500};
    `}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
