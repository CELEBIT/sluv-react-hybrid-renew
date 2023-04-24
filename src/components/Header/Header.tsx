import React from 'react'
import { HeaderWrapper, Title } from './styles'
import { ReactComponent as ArrowBack } from '../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../assets/close_20.svg'

interface HeaderProps {
  isModalHeader: boolean
  hasArrow?: boolean
  title?: string
  children?: any
}

const Header = ({ isModalHeader, hasArrow, title, children }: HeaderProps) => {
  return (
    <HeaderWrapper role='heading' isModalHeader={isModalHeader}>
      <div className='left'>
        {hasArrow && <ArrowBack className='arrow-back' />}
        {title && <Title>{title}</Title>}
      </div>
      <div className='right'>
        {isModalHeader && <Close />}
        {children}
      </div>
    </HeaderWrapper>
  )
}

export default Header
