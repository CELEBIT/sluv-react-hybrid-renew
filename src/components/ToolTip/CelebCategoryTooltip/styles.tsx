import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  ${Pretendard({ size: 16, weight: Common.bold.regular, color: Common.colors.WH })}
`

export const TooltipContent = styled.div`
  background-color: #55585a;
  min-height: 3.125rem;
  min-width: 3.125rem;
  border-radius: 4.6875rem;
  padding: 0.9375rem 0.75rem;
`

export const TriangleContainer = styled.div`
  position: relative;
  right: 0.75rem;
  border-top: 1.25rem solid transparent;
  border-bottom: 1.25rem solid transparent;
  border-left: 1.25rem solid #55585a;
  border-radius: 3.125rem;
`
