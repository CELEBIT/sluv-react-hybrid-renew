import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const FilterWrapper = styled.div<{ isSelected: boolean; isColor?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  height: 2.625rem;
  min-width: 3.625rem;
  padding: 0.5313rem 0.75rem;
  padding: ${(props) => (props.isColor ? '0.75rem 1.25rem' : '0.5rem 0.75rem')};
  border-radius: 1.5625rem;
  background-color: white;
  ${(props) =>
    props.isSelected
      ? Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.BK })
      : Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}

  border:${(props) =>
    props.isSelected ? `1px solid ${Common.colors.BK}` : `1px solid ${Common.colors.GR300}`};
`

export const ColorIndicator = styled.div<{ color: string }>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background-color: ${({ color }) =>
    (color === 'red' && '#E03131') ||
    (color === 'orange' && '#F76707') ||
    (color === 'yellow' && '#FFD43B') ||
    (color === 'green' && '#087F5B') ||
    (color === 'blue' && '#1971C2') ||
    (color === 'navy' && '#093157') ||
    (color === 'purple' && '#5F3DC4') ||
    (color === 'pink' && '#F36D9C') ||
    (color === 'beige' && '#FBDDB8') ||
    (color === 'brown' && '#784516') ||
    (color === 'gray' && '#ADB5BD') ||
    (color === 'black' && '#000000') ||
    (color === 'white' && '#FFFFFF') ||
    (color === 'silver' &&
      'linear-gradient(164.14deg, #AEB5BC 7.48%, rgba(174, 181, 188, 0) 108.67%)') ||
    (color === 'gold' &&
      'linear-gradient(164.14deg, #E8A700 7.48%, rgba(232, 167, 0, 0) 108.67%)')};
`
