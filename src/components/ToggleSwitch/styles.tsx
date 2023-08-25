import styled from '@emotion/styled'
import { Common } from '../styles'

export const StyledLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-indent: -9999px;
  width: 2.25rem;
  height: 1.375rem;
  background: ${({ checked }) => (checked ? Common.colors.SEC : Common.colors.GR200)};
  display: block;
  border-radius: 100px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: ${({ checked }) => (checked ? '0.125rem' : 'calc(55% - 0.1875rem)')};
    top: 0.125rem;
    width: 1.125rem;
    height: 1.125rem;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
`
