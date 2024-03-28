import React, { ChangeEvent } from 'react'
import { StyledLabel } from './styles'

export type ToggleSwitchProps = React.HTMLAttributes<HTMLInputElement> & {
  onToggleSwitch?: (e: ChangeEvent<HTMLInputElement>) => void
  isToggleOn: boolean
  onClick?: (e: React.MouseEvent<HTMLLabelElement>) => void
}

const ToggleSwitch = ({ isToggleOn, onToggleSwitch, onClick }: ToggleSwitchProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (onClick) {
      onClick(e) // Execute onClick prop if provided
    }
    // Stop propagation to prevent the event from bubbling further
    e.stopPropagation()
  }
  return (
    <StyledLabel htmlFor='checkbox' isToggleOn={isToggleOn} onClick={handleClick}>
      <input id='checkbox' type='checkbox' checked={isToggleOn} onChange={onToggleSwitch} />
    </StyledLabel>
  )
}

export default ToggleSwitch
