import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityPageContainer, QuestionListWrapper } from './styles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as NoticeOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as NoticeOff } from '../../assets/bell_off_24.svg'
import WriteCommunityItemButton from './components/WriteCommunityItemButton/WriteCommunityItemButton'
import BannerItemsList from './components/BannerItems/BannerItemsList'
import Menu from './components/Menu/Menu'
import { ComponentContainer } from '../home/styles'
import NewCommunity from './components/NewCommunity/NewCommunity'
import styled from '@emotion/styled'

const Community = () => {
  const navigate = useNavigate()

  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
        setIsStickyAtTop(top <= 65)
        console.log(top)
      }
    }
    ComponentContainerRef.current?.addEventListener('scroll', handleScroll)
    return () => {
      ComponentContainerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <CommunityPageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} title='커뮤니티' hasArrow={false}>
          <Search fill='black' onClick={() => navigate('/search')}></Search>
          {/* <NoticeOff></NoticeOff> */}
        </Header>
      </HeaderWrapper>
      <ComponentLayout ref={ComponentContainerRef}>
        <BannerItemsList></BannerItemsList>
        <Menu menuRef={stickyRef} isStickyAtTop={isStickyAtTop}></Menu>
        <NewCommunity></NewCommunity>
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentLayout>
    </CommunityPageContainer>
  )
}

export const ComponentLayout = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

export default Community
