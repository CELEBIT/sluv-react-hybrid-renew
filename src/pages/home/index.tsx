import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ReactComponent as Banner } from '../../assets/Top.svg'
import { ReactComponent as HotCelebBanner } from '../../assets/HotCelebBanner.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'

import { ReactComponent as Search } from '../../assets/search_24.svg'

import { ComponentContainer, HomeContainer } from './styles'
import Header from '../../components/Header/Header'
import Curation from './components/Curation/Curation'
import BuyNow from './components/BuyNow/BuyNow'
import WeeklyTopUser from './components/WeeklyTopUser/WeeklyTopUser'
import NewItems from './components/NewItems/NewItems'
import HotCelebItems from './components/HotCelebItems/HotCelebItems'
import HowAbout from './components/HowAbout/HowAbout'
import LuxuryMood from './components/LuxuryMood/LuxuryMood'
import PresentItem from './components/PresentItem/PresentItem'
import { Divider } from '../item/detail/styles'
import { HeaderWrapper } from '../../components/Header/styles'
import { Common } from '../../components/styles'
import { useNavigate } from 'react-router-dom'
import storage from '../../utils/storage'
import ScrollToTop from './components/ScrollToTopButton'

const Home = () => {
  const navigate = useNavigate()
  const bannerRef = useRef<HTMLDivElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false)

  useEffect(() => {
    if (!storage.get('accessToken')) {
      confirm('스럽을 이용하시려면 로그인해주세요.')
      navigate('/')
    }
  })
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current && scrollToTopRef.current) {
        scrollToTopRef.current?.scrollTop > bannerRef.current.offsetHeight
          ? setShowScrollToTop(true)
          : setShowScrollToTop(false)
      }
    }

    scrollToTopRef.current?.addEventListener('scroll', handleScroll)
    return () => scrollToTopRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    scrollToTopRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <HomeContainer>
      <HeaderWrapper role='heading' isModalHeader={false} style={{ padding: '0.625rem 1.25rem' }}>
        <div className='left' onClick={() => navigate('/home')}>
          <Logo></Logo>
        </div>
        <div className='right'>
          <Search fill={Common.colors.BK} onClick={() => navigate('/search')}></Search>
        </div>
      </HeaderWrapper>
      <ComponentContainer ref={scrollToTopRef}>
        <div ref={bannerRef}>
          {/* <Banner style={{ height: '100%', width: '100vw' }}></Banner> */}
          <object
            data='../../assets/HotCelebBanner.svg'
            style={{ height: '100%', width: '100vw' }}
          ></object>
        </div>
        <Curation></Curation>
        <BuyNow></BuyNow>
        <WeeklyTopUser></WeeklyTopUser>
        <NewItems></NewItems>
        <Divider></Divider>
        <HotCelebItems></HotCelebItems>
        <Divider></Divider>
        <HowAbout></HowAbout>
        <div>
          <HotCelebBanner style={{ height: '100%', width: '100vw' }}></HotCelebBanner>
        </div>
        <LuxuryMood></LuxuryMood>
        <Divider></Divider>
        <PresentItem></PresentItem>
        {showScrollToTop && <ScrollToTop onClick={handleClick} />}
      </ComponentContainer>
    </HomeContainer>
  )
}

export default Home
