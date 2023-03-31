import React, { useState, useEffect } from 'react'
import { MediumWrapper } from './styles'
import { ReactComponent as Search } from '../../assets/search_18.svg'
import { Common } from '../styles'

interface ButtonMediumProps {
  text: string
  icon?: boolean
  type: string
  //  type 상태는 pri, sec, disable 로 디자인 구분
  active?: boolean
  // active 는 클릭 여부
  error?: boolean

  onClick: () => void
}

const ButtonMedium = ({ text, icon, type, active, error, onClick }: ButtonMediumProps) => {
  const [color, setColor] = useState('')
  useEffect(() => {
    if (type == 'sec') {
      setColor(Common.colors.BK)
    } else {
      setColor(Common.colors.GR500)
    }
  }, [])

  return (
    <MediumWrapper icon={icon} type={type} active={active} error={error} onClick={onClick}>
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
}

export default ButtonMedium
