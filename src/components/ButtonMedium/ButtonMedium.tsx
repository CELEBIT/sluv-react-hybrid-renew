import { forwardRef, useEffect, useState } from 'react'
import { ReactComponent as Beauty } from '../../assets/ItemFilter/beauty_18.svg'
import { ReactComponent as BeautyActive } from '../../assets/ItemFilter/beauty_active.svg'
import { ReactComponent as Etc } from '../../assets/ItemFilter/etc_18.svg'
import { ReactComponent as EtcActive } from '../../assets/ItemFilter/etc_active.svg'
import { ReactComponent as Headphone } from '../../assets/ItemFilter/headphone_18.svg'
import { ReactComponent as HeadphoneActive } from '../../assets/ItemFilter/headphone_active.svg'
import { ReactComponent as Jacket } from '../../assets/ItemFilter/jacket_18.svg'
import { ReactComponent as JacketActive } from '../../assets/ItemFilter/jacket_active.svg'
import { ReactComponent as Jeans } from '../../assets/ItemFilter/jeans_18.svg'
import { ReactComponent as JeansActive } from '../../assets/ItemFilter/jeans_active.svg'
import { ReactComponent as Life } from '../../assets/ItemFilter/life_18.svg'
import { ReactComponent as LifeActive } from '../../assets/ItemFilter/life_active.svg'
import { ReactComponent as Search } from '../../assets/ItemFilter/search_18.svg'
import { ReactComponent as Skirt } from '../../assets/ItemFilter/skirt_18.svg'
import { ReactComponent as SkirtActive } from '../../assets/ItemFilter/skirt_active.svg'
import { ReactComponent as Tshirt } from '../../assets/ItemFilter/t-shirt_18.svg'
import { ReactComponent as TshirtActive } from '../../assets/ItemFilter/t-shirt_active.svg'
import { Common } from '../styles'
import { MediumWrapper } from './styles'

export interface ButtonMediumProps {
  text: string
  icon?:
    | 'search'
    | 'beauty'
    | 'etc'
    | 'headphone'
    | 'jacket'
    | 'jeans'
    | 'life'
    | 'skirt'
    | 'tshirt'
  type: 'pri' | 'sec' | 'disable'
  active?: boolean
  error?: boolean
  onClick?: () => void
}

const iconMap = {
  search: { default: Search, active: Search },
  beauty: { default: Beauty, active: BeautyActive },
  etc: { default: Etc, active: EtcActive },
  headphone: { default: Headphone, active: HeadphoneActive },
  jacket: { default: Jacket, active: JacketActive },
  jeans: { default: Jeans, active: JeansActive },
  life: { default: Life, active: LifeActive },
  skirt: { default: Skirt, active: SkirtActive },
  tshirt: { default: Tshirt, active: TshirtActive },
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

    let IconComponent = null
    if (icon) {
      const iconSet = iconMap[icon]
      IconComponent = active ? iconSet.active : iconSet.default
    }

    return (
      <MediumWrapper
        icon={!!icon}
        type={type}
        active={active}
        error={error}
        onClick={onClick}
        ref={ref}
      >
        {icon && IconComponent && (
          <div style={{ marginRight: '2px' }}>
            <IconComponent width='18' height='18' />
          </div>
        )}
        <p>{text}</p>
      </MediumWrapper>
    )
  },
)

ButtonMedium.displayName = 'ButtonMedium'

export default ButtonMedium
