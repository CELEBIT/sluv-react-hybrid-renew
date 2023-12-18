import React, { ChangeEvent } from 'react'
import { StyledLabel } from './styles'

export type ToggleSwitchProps = React.HTMLAttributes<HTMLInputElement> & {
  onToggleSwitch?: (e: ChangeEvent<HTMLInputElement>) => void
  isToggleOn: boolean
}

const ToggleSwitch = ({ isToggleOn, onToggleSwitch }: ToggleSwitchProps) => {
  return (
    <StyledLabel htmlFor='checkbox' isToggleOn={isToggleOn}>
      <input id='checkbox' type='checkbox' checked={isToggleOn} onChange={onToggleSwitch} />
    </StyledLabel>
  )
}

export default ToggleSwitch
