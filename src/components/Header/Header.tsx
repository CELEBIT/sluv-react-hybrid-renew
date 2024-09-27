import React, { memo } from 'react'
import { HeaderWrapper, Title } from './styles'
import { ReactComponent as ArrowBack } from '../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../assets/close_20.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as BellOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as BellOff } from '../../assets/bell_off_24.svg'
import { useNavigate } from 'react-router-dom'
import useNotificationQuery from '../../apis/notification/hooks/useNotificationQuery'

interface HeaderProps {
  isMainHeader?: boolean
  isModalHeader: boolean
  hasNotification?: boolean
  hasArrow?: boolean
  title?: string
  children?: any
  backBtnClick?: () => void
  modalCloseBtnClick?: () => void
}

const Header = ({
  isMainHeader,
  hasNotification,
  isModalHeader,
  hasArrow,
  title,
  children,
  backBtnClick,
  modalCloseBtnClick,
}: HeaderProps) => {
  const navigate = useNavigate()
  const { getNotificationReadStatus } = useNotificationQuery()
  const { data } = getNotificationReadStatus()

  return (
    <HeaderWrapper
      role='heading'
      isModalHeader={isModalHeader}
      style={isMainHeader ? { padding: '0.625rem 1.25rem' } : undefined}
    >
      {isMainHeader ? (
        <div className='left' onClick={() => navigate('/home')}>
          <Logo></Logo>
        </div>
      ) : (
        <div className='left'>
          {hasArrow && (
            <ArrowBack
              onClick={backBtnClick ? backBtnClick : () => navigate(-1)}
              className='arrow-back'
            />
          )}

          {title && <Title>{title}</Title>}
        </div>
      )}

      <div className='right'>
        {isModalHeader && <Close onClick={modalCloseBtnClick} />}
        {children}
        {hasNotification && (
          <>
            {data && data.isAllRead ? (
              <BellOff onClick={() => navigate('/notifications')}></BellOff>
            ) : (
              <BellOn onClick={() => navigate('/notifications')}></BellOn>
            )}{' '}
          </>
        )}
      </div>
    </HeaderWrapper>
  )
}

export default memo(Header)
