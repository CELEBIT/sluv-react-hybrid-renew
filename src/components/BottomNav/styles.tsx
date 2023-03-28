import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Root = styled.div<{ isOpen: boolean }>`
  z-index: 50;
  position: fixed;
  bottom: ${(props) => (props.isOpen ? '0' : '-50px')};
  left: 0;
  right: 0;
  height: 50px;

  display: flex;
  justify-content: space-between;

  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: bottom 300ms ease-in-out;

  border: 1px red solid;
`

export const BottomNavItemLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  margin: 0 5px;
  background-color: yellow;
`

export const BottomNavLabel = styled.span``
