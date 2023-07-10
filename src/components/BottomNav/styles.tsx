import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const Root = styled.div<{ isOpen: boolean }>`
  z-index: 50;
  position: fixed;
  bottom: ${(props) => (props.isOpen ? '0' : '-50px')};
  left: 0;
  right: 0;
  height: 3.625rem;

  display: flex;
  justify-content: space-between;

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: bottom 300ms ease-in-out;

  background-color: ${Common.colors.WH};
  border-top: 1px solid ${Common.colors.GR100};
`

export const BottomNavItemLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.1875rem;
  .active {
    ${Pretendard({
      size: 12,
      weight: Common.bold.regular,
      color: Common.colors.COMPLETE,
    })};
  }
`

export const BottomNavLabel = styled.span`
  ${Pretendard({
    size: 12,
    weight: Common.bold.regular,
    color: Common.colors.GR500,
  })};
`
