import React, { memo, useState } from 'react'
import { HeaderWrapper, Title } from '../styles'
import { ReactComponent as ArrowBack } from '../../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../../assets/close_20.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow_up_18.svg'
import { ReactComponent as ArrowDown } from '../../../assets/arrow_down_18.svg'
import { useNavigate } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'

interface HeaderProps {
  isModalHeader: boolean
  hasArrow?: boolean
  title?: string
  children?: any
  backBtnClick?: () => void
  modalCloseBtnClick?: () => void
}

export const communityMenuState = atom<string>({
  key: atomKeys.communityMenuState,
  default: 'find',
})

const CommunityHeader = ({
  isModalHeader,
  hasArrow,
  title,
  children,
  backBtnClick,
  modalCloseBtnClick,
}: HeaderProps) => {
  const navigate = useNavigate()
  const setCommunityMenu = useRecoilState(communityMenuState)
  const [menuOpen, setMenuOpen] = useState(false)
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

export default memo(CommunityHeader)
