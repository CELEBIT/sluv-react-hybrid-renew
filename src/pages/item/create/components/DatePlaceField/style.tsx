import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const DatePlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5.375rem;
  width: calc(100%-1.25rem);
  border-radius: 0.5rem;
  padding: 0.625rem 1.25rem;
  margin: 0 1.25rem;
  border: 0.0625rem solid ${Common.colors.GR200};
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
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR600,
  })}
`
export const ValueText = styled.span<{
  isEmpty?: boolean
}>`
  margin: 0;
  ${Pretendard({
    size: 17,
    weight: Common.bold.thin,
    color: Common.colors.BK,
  })}

  ${({ isEmpty }) =>
    isEmpty &&
    `
      color: ${Common.colors.GR500};
    `}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
