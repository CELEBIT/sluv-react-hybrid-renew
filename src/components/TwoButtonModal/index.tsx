import { BtnModalContainer } from '../Modals/styles';
import React from 'react';
import ButtonHalf from '../ButtonHalf/ButtonHalf';

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
      <div style={{display: 'flex'}}> 
        <ButtonHalf type='cancel' text={leftButtonName} onClick={() => leftButtonOnClick} />
        <ButtonHalf type='confirm' text={rightButtonName} onClick={() => rightButtonOnClick} />
      </div>
    </BtnModalContainer>
  )
}

export default TwoButtonModal;