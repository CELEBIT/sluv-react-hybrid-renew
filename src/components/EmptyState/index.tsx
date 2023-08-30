import React from 'react'
import { EmptyStateContainer, SubTitle, TextWrapper, Title } from './styles'
import { ReactComponent as Clock } from '../../assets/clock_36.svg'
import { ReactComponent as Storage } from '../../assets/storage_36.svg'
import { ReactComponent as Comment } from '../../assets/list_36.svg'
import { ReactComponent as Item } from '../../assets/item_36.svg'
import { ReactComponent as Search } from '../../assets/search_36.svg'
import { ReactComponent as Like } from '../../assets/like_36.svg'

type EmptyStateProps = {
  icon: string
  // clock, save, comment, item, search, like
  title: string
  subtitle?: string
  children?: any
}
const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'clock':
      return <Clock />
    case 'save':
      return <Storage />
    case 'comment':
      return <Comment />
    case 'item':
      return <Item />
    case 'search':
      return <Search />
    case 'like':
      return <Like />
    default:
      return null
  }
}

const EmptyState = ({ icon, title, subtitle, children }: EmptyStateProps) => {
  const iconComponent = getIconComponent(icon)
  return (
    <EmptyStateContainer>
      {iconComponent}
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </TextWrapper>
      {children}
    </EmptyStateContainer>
  )
}

export default EmptyState
