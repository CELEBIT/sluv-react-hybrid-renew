import styled from '@emotion/styled'
import { HTMLAttributes } from 'react'

export const Button = styled.button<HTMLAttributes<HTMLButtonElement>>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: Pretendard;
  width: 100%;
  min-height: 56px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  background-color: ${({ disabled }) => (disabled ? '#EAECEF' : '#454381')};
`
