import React from 'react'
import { SmallWrapper } from './styles'
import { ReactComponent as Add } from '../../assets/add_13.svg'
import { ReactComponent as Check } from '../../assets/check_13.svg'
import { Common } from '../styles'

interface ButtonSmallProps {
  text: string
  icon?: boolean
  iconName?: string
  // iconName: add or check
  type: string
  //  type 상태는 pri or sec
  onClick: () => void
}

const ButtonSmall = ({ text, icon, iconName, type, onClick }: ButtonSmallProps) => {
  return (
    <SmallWrapper icon={icon} type={type} onClick={onClick}>
      <p>{text}</p>
      {icon ? (
        <div>
          {type === 'pri' ? (
            <>
              {iconName === 'add' ? (
                <Add width='13' height='13' stroke={Common.colors.GR600} />
              ) : (
                <Check width='13' height='13' stroke={Common.colors.GR600} />
              )}
            </>
          ) : (
            <>
              {iconName === 'add' ? (
                <Add width='13' height='13' stroke={Common.colors.BK} />
              ) : (
                <Check width='13' height='13' stroke={Common.colors.BK} />
              )}
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </SmallWrapper>
  )
}

export default ButtonSmall
