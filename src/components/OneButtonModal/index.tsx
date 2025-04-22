import styled from '@emotion/styled'
import React from 'react'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { BtnModalContainer } from '../Modals/styles'

interface OneButtonModalProps {
  buttonName: string
  buttonOnClick: () => void
  children: React.ReactNode
}

const OneButtonModal = ({ buttonName, children, buttonOnClick }: OneButtonModalProps) => {
  return (
    <BtnModalContainer>
      {children}
      <BtnWrapper>
        <ButtonLarge active={true} text={buttonName} onClick={buttonOnClick} />
      </BtnWrapper>
    </BtnModalContainer>
  )
}

export default OneButtonModal

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
