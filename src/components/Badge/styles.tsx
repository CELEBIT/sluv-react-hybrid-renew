import styled from '@emotion/styled'
import { Common } from '../styles'

export const BadgeWrapper = styled.div<{ color: string }>`
  display: inline-flex;
  flex-shrink: 0;
  background-color: ${({ color }) =>
    (color === 'gray' && `${Common.colors.GR100}`) ||
    (color === 'pink' && `${Common.colors.PKBg}`) ||
    (color === 'orange' && `${Common.colors.ORGBG}`) ||
    (color === 'yellow' && `${Common.colors.YLBG}`) ||
    (color === 'green' && `${Common.colors.GRNBG}`) ||
    (color === 'blue' && `${Common.colors.BLBG}`)};
  color: ${({ color }) =>
    (color === 'gray' && `${Common.colors.GR600}`) ||
    (color === 'pink' && `${Common.colors.PK}`) ||
    (color === 'orange' && `${Common.colors.ORG}`) ||
    (color === 'yellow' && `${Common.colors.YL}`) ||
    (color === 'green' && `${Common.colors.GRN}`) ||
    (color === 'blue' && `${Common.colors.BL}`)};
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 0.875rem;
  height: 1.8125rem;
  min-width: 3.0625rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6.25rem;
  white-space: nowrap;
`
