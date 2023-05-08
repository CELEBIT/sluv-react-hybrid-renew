import React, { useState, useEffect, forwardRef } from 'react'
import { MediumWrapper } from './styles'
import { ReactComponent as Search } from '../../assets/search_18.svg'
import { Common } from '../styles'

interface ButtonMediumProps {
  text: string
  icon?: boolean
  type: string
  active?: boolean
  error?: boolean
  onClick: () => void
}

const ButtonMedium = forwardRef<HTMLDivElement, ButtonMediumProps>(
  ({ text, icon, type, active, error, onClick }, ref) => {
    const [color, setColor] = useState('')
    useEffect(() => {
      if (type === 'sec') {
        setColor(Common.colors.BK)
      } else {
        setColor(Common.colors.GR500)
      }
    }, [])

    return (
      <MediumWrapper
        icon={icon}
        type={type}
        active={active}
        error={error}
        onClick={onClick}
        ref={ref}
      >
        {icon ? (
          <div>
            {active ? (
              <Search width='18' height='18' fill={Common.colors.SEC} />
            ) : (
              <Search width='18' height='18' fill={color} />
            )}
          </div>
        ) : (
          <></>
        )}
        <p>{text}</p>
      </MediumWrapper>
    )
  },
)

ButtonMedium.displayName = 'ButtonMedium'

export default ButtonMedium
