import { BtnModalContainer } from '../Modals/styles'
import React from 'react'
import ButtonHalf from '../ButtonHalf/ButtonHalf'
import styled from '@emotion/styled'
import ButtonLarge from '../ButtonLarge/ButtonLarge'

interface OneButtonModalProps {
  buttonName: string
  buttonOnClick: <T>(args: T) => void
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
