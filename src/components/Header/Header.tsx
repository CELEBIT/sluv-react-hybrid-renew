import React, { memo } from 'react'
import { HeaderWrapper, Title } from './styles'
import { ReactComponent as ArrowBack } from '../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../assets/close_20.svg'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  isModalHeader: boolean
  hasArrow?: boolean
  title?: string
  children?: any
  backBtnClick?: () => void
  modalCloseBtnClick?: () => void
}

const Header = ({
  isModalHeader,
  hasArrow,
  title,
  children,
  backBtnClick,
  modalCloseBtnClick,
}: HeaderProps) => {
  const navigate = useNavigate()

  return (
    <HeaderWrapper role='heading' isModalHeader={isModalHeader}>
      <div className='left'>
        {hasArrow && (
          <ArrowBack
            onClick={backBtnClick ? backBtnClick : () => navigate(-1)}
            className='arrow-back'
          />
        )}
        {title && <Title>{title}</Title>}
      </div>
      <div className='right'>
        {isModalHeader && <Close onClick={modalCloseBtnClick} />}
        {children}
      </div>
    </HeaderWrapper>
  )
}

export default memo(Header)
