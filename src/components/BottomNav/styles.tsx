import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Root = styled.div`
  z-index: 50;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;

  border: 1px red solid;
`

export const BottomNavItemLink = styled(Link)`
  text-decoration: none;
`;

export const BottomNavLabel = styled.span`
  
`;