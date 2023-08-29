import React, { ChangeEvent } from 'react'
import { StyledLabel } from './styles'

interface ToggelSwitchProps {
  switchState: boolean
  onClick: any
}

const ToggleSwitch = ({ switchState, onClick }: ToggelSwitchProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onClick()
  }
  return (
    <StyledLabel htmlFor='checkbox' checked={switchState}>
      <input id='checkbox' type='checkbox' checked={switchState} onChange={handleOnChange} />
    </StyledLabel>
  )
}

export default ToggleSwitch
