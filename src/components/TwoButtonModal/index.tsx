import { BtnModalContainer } from '../Modals/styles';
import React from 'react';
import ButtonHalf from '../ButtonHalf/ButtonHalf';
import styled from '@emotion/styled';

interface TwoButtonModalProps {
  leftButtonName: string
  rightButtonName: string
  leftButtonOnClick: <T>(args: T) => void
  rightButtonOnClick: <T>(args: T) => void
  children: React.ReactNode
}

const TwoButtonModal = ({
  leftButtonName,
  rightButtonName,
  leftButtonOnClick,
  rightButtonOnClick,
  children,
}: TwoButtonModalProps) => {
  return (
    <BtnModalContainer>
      {children}
      <TwoBtnWrapper> 
        <ButtonHalf type='cancel' text={leftButtonName} onClick={leftButtonOnClick} />
        <ButtonHalf type='confirm' text={rightButtonName} onClick={rightButtonOnClick} />
      </TwoBtnWrapper>
    </BtnModalContainer>
  )
}

export default TwoButtonModal;

const TwoBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`