import { ReactComponent as Alert } from '../../assets/alert_36.svg'
import { ReactComponent as Bell } from '../../assets/bell_36.svg'
import { ReactComponent as Clock } from '../../assets/clock_36.svg'
import { ReactComponent as Item } from '../../assets/item_36.svg'
import { ReactComponent as Like } from '../../assets/like_36.svg'
import { ReactComponent as Comment } from '../../assets/list_36.svg'
import { ReactComponent as Search } from '../../assets/search_36.svg'
import { ReactComponent as Storage } from '../../assets/storage_36.svg'

import { EmptyStateContainer, SubTitle, TextWrapper, Title } from './styles'

export type IconType = 'clock' | 'save' | 'comment' | 'item' | 'search' | 'like' | 'bell' | 'alert'

interface EmptyStateProps {
  icon: IconType
  title: string
  subtitle?: string
  children?: React.ReactNode
}

const iconMap: Record<IconType, JSX.Element> = {
  clock: <Clock />,
  save: <Storage />,
  comment: <Comment />,
  item: <Item />,
  search: <Search />,
  like: <Like />,
  bell: <Bell />,
  alert: <Alert />,
}

const EmptyState = ({ icon, title, subtitle, children }: EmptyStateProps) => {
  return (
    <EmptyStateContainer>
      {iconMap[icon]}
      <TextWrapper>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </TextWrapper>
      {children}
    </EmptyStateContainer>
  )
}

export default EmptyState
