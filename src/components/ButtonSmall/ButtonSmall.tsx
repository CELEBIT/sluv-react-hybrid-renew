import { ReactComponent as Add } from '../../assets/add_13.svg'
import { ReactComponent as Check } from '../../assets/check_13.svg'
import { Common } from '../styles'
import { SmallWrapper } from './styles'

interface ButtonSmallProps {
  text: string
  icon?: boolean
  iconName?: 'add' | 'check'
  active?: boolean
  type: 'pri' | 'sec'
  onClick: any
}

const ButtonSmall = ({ text, icon, iconName, active, type, onClick }: ButtonSmallProps) => {
  return (
    <SmallWrapper icon={icon} type={type} active={active} onClick={onClick}>
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
