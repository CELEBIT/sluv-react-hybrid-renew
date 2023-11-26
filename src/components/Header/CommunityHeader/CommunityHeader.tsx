import React, { memo, useEffect, useState } from 'react'
import { Title } from '../styles'
import { ReactComponent as ArrowBack } from '../../../assets/arrow_back_20.svg'
import { ReactComponent as Close } from '../../../assets/close_20.svg'
import { ReactComponent as ArrowUp } from '../../../assets/arrow_up_18.svg'
import { ReactComponent as ArrowDown } from '../../../assets/arrow_down_18.svg'
import { ReactComponent as Add } from '../../../assets/add_18.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { atomKeys } from '../../../config/atomKeys'
import { HeaderWrapper } from './styles'
import DropDownMenu from './DropDownMenu'
import { Menu } from './DropDownMenu/styles'
import { CommunityMenu, CommunityMenuList } from '../../../config/communityMenu'
import { communityItemState, imgItemListState } from '../../../recoil/communityInfo'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

interface HeaderProps {
  children?: any
  backBtnClick?: () => void
}

export const communityMenuState = atom<string>({
  key: atomKeys.communityMenuState,
  default: '찾아주세요',
})

const CommunityHeader = ({ children, backBtnClick }: HeaderProps) => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const { pathname } = useLocation()
  const questionInfo = useRecoilValue(communityItemState)
  const [communityMenu, setCommunityMenu] = useRecoilState(communityMenuState)
  const imgItemList = useRecoilValue(imgItemListState)
  const [menuOpen, setMenuOpen] = useState(false)
  const onMenuClick = (menu: CommunityMenu) => {
    if (
      menu.name !== communityMenu &&
      (questionInfo.id ||
        questionInfo.celebId ||
        questionInfo.newCelebId ||
        questionInfo.title ||
        questionInfo.content ||
        questionInfo.imgList ||
        questionInfo.itemList ||
        questionInfo.categoryNameList ||
        imgItemList)
    ) {
      setMenuOpen(!menuOpen)
      openModal(modals.CommunityTabChangeModal, { name: menu.name, url: menu.url })
    } else {
      setCommunityMenu(menu.name)
      navigate(menu.url)
    }
  }
  useEffect(() => {
    if (pathname.includes('/community/create/find-request')) {
      setCommunityMenu('찾아주세요')
    }
    if (pathname.includes('/community/create/buy')) {
      setCommunityMenu('이 중에 뭐 살까')
    }
    if (pathname.includes('/community/create/howabout')) {
      setCommunityMenu('이거어때')
    }
    if (pathname.includes('/community/create/recommend')) {
      setCommunityMenu('추천해 줘')
    }
  }, [])
  return (
    <HeaderWrapper role='heading'>
      <div className='left'>
        <ArrowBack onClick={backBtnClick} className='arrow-back' />
        {pathname.includes('edit') ? (
          <Title>{communityMenu}</Title>
        ) : (
          <>
            <Title onClick={() => setMenuOpen(!menuOpen)}>{communityMenu}</Title>
            {menuOpen ? <ArrowUp stroke='black' /> : <ArrowDown stroke='black' />}

            {menuOpen === true && (
              <DropDownMenu>
                {CommunityMenuList.map((menu) => {
                  return (
                    <Menu key={menu.name} onClick={() => onMenuClick(menu)}>
                      <Add></Add>
                      <span>{menu.name}</span>
                    </Menu>
                  )
                })}
              </DropDownMenu>
            )}
          </>
        )}
      </div>
      <div className='right'>{children}</div>
    </HeaderWrapper>
  )
}

export default memo(CommunityHeader)
