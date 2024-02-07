import React from 'react'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { Common } from '../styles'

// import Button from '@shared/Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({ label, onClick, disabled }: FixedBottomButtonProps) {
  return (
    <Container>
      <ButtonLarge text={label} active={!disabled} onClick={onClick}></ButtonLarge>
    </Container>
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`
export default FixedBottomButton
