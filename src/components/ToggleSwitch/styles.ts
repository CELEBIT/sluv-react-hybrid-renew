import styled from '@emotion/styled'
import { Common } from '../styles'
import { ToggleSwitchProps } from './ToggleSwitch'

export const StyledLabel = styled.label<Pick<ToggleSwitchProps, 'isToggleOn'>>`
  cursor: pointer;
  text-indent: -9999px;
  width: 2.25rem;
  height: 1.375rem;
  background: ${({ isToggleOn }) => (isToggleOn ? Common.colors.SEC : Common.colors.GR200)};
  display: block;
  border-radius: 100px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: ${({ isToggleOn }) => (isToggleOn ? 'calc(55% - 0.1875rem)' : '0.125rem')};
    top: 0.125rem;
    width: 1.125rem;
    height: 1.125rem;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }
`
