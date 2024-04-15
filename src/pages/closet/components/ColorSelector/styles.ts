import styled from '@emotion/styled'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../../utils/consts'

export const Root = styled.div`
  width: 220px;
`
export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const ColorCircle = styled.i<{ colorScheme: CoverBoxColorKey }>`
  background: ${({ colorScheme }) => DEFAULT_COVER_COLOR_SET[colorScheme].nameTag?.background};
  border-radius: 50%;
  width: 1.625rem;
  height: 1.625rem;
`

export const SelectedDot = styled.i<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? '#000000' : 'transparent')};
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
`

export const ColorCircleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 0.375rem;
`
