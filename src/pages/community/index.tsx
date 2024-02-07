import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CommunityPageContainer, QuestionListWrapper, TabContainer } from './styles'
import { HeaderWrapper } from '../item/addInfo/styles'
import Header from '../../components/Header/Header'
import { ReactComponent as Search } from '../../assets/search_24.svg'
import { ReactComponent as NoticeOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as NoticeOff } from '../../assets/bell_off_24.svg'
import WriteCommunityItemButton from './components/WriteCommunityItemButton/WriteCommunityItemButton'
import BannerItemsList from './components/BannerItems/BannerItemsList'
import Menu from './components/Menu/Menu'
import { ComponentContainer } from '../home/styles'
import BlackFilter from '../../components/FIlter/BlackFilter'
import NewCommunity from './components/NewCommunity/NewCommunity'
import HotCommunity from './components/HotCommunity/HotCommunity'

const Community = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('Hot')

  const ComponentContainerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [isStickyAtTop, setIsStickyAtTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect()
        setIsStickyAtTop(top <= 65)
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
          <NoticeOff></NoticeOff>
        </Header>
      </HeaderWrapper>
      <ComponentContainer ref={ComponentContainerRef}>
        <BannerItemsList></BannerItemsList>
        <Menu menuRef={stickyRef} isStickyAtTop={isStickyAtTop}></Menu>
        <TabContainer>
          <BlackFilter isSelected={selectedTab === 'Hot'} onClick={() => setSelectedTab('Hot')}>
            Hot
          </BlackFilter>
          <BlackFilter isSelected={selectedTab === 'New'} onClick={() => setSelectedTab('New')}>
            New
          </BlackFilter>
        </TabContainer>
        <QuestionListWrapper>
          {selectedTab === 'Hot' ? <HotCommunity></HotCommunity> : <NewCommunity></NewCommunity>}
        </QuestionListWrapper>
        <WriteCommunityItemButton isTop={!isStickyAtTop}></WriteCommunityItemButton>
      </ComponentContainer>
    </CommunityPageContainer>
  )
}

export default Community
