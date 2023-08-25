import React, { ChangeEvent, useState } from 'react'
import { StyledLabel } from './styles'

const ToggleSwitch = () => {
  const [switchState, setSwitchState] = useState<boolean>(true)
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('---', e.target.checked)
    setSwitchState(!switchState)
  }
  return (
    <StyledLabel htmlFor='checkbox' checked={switchState}>
      <input id='checkbox' type='checkbox' checked={switchState} onChange={handleOnChange} />
    </StyledLabel>
  )
}

export default ToggleSwitch
