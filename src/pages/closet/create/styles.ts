import { HeaderContainer, Root } from '../styles'
import styled from '@emotion/styled'
import { HTMLAttributes } from 'react'

export const CreateRoot = Root

export const CreateHeaderContainer = HeaderContainer

export const BodyContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1.5rem;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 1.25rem;
  padding: 0 1.25rem;
`

export const ClosetCreateFooterElementWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;

  & > p {
    font-family: Pretendard;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
  }
`

export const Button = styled.button<HTMLAttributes<HTMLButtonElement>>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Pretendard;
  width: 100%;
  min-height: 3.5rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 500;
  background-color: ${({ disabled }) => (disabled ? '#EAECEF' : '#454381')};
`

export const CreateFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 5;
`

export const DeleteNameTagContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

export const DeleteConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: ${({ disabled }) => (disabled ? '#AEB5BC' : '#212529')};
  background: none;
  border: none;
`

export const MockedIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`
