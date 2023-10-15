import { HeaderContainer, Root } from '../styles'
import styled from '@emotion/styled'

export const CreateRoot = Root

export const CreateHeaderContainer = HeaderContainer

export const BodyContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
  flex-direction: column;
`

export const ClosetCreateFooterElementWrapper = styled.div`
  box-sizing: border-box;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
