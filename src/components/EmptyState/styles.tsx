import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.8125rem;
  padding: 2.5rem 0 4.375rem 0;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
`

export const Title = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const SubTitle = styled.span`
  white-space: pre-wrap;
  text-align: center;
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR500 })}
`
