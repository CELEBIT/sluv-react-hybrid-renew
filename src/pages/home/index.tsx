import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ReactComponent as Banner } from '../../assets/MainBanner/최예나배너.svg'
import { ReactComponent as HotCelebBanner } from '../../assets/MainBanner/OctoberBanner.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as BellOn } from '../../assets/bell_on_24.svg'
import { ReactComponent as BellOff } from '../../assets/bell_off_24.svg'
import { ReactComponent as Search } from '../../assets/search_24.svg'

import { ComponentContainer, HomeContainer } from './styles'
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
import useModals from '../../components/Modals/hooks/useModals'
import { modals } from '../../components/Modals'
import Header from '../../components/Header/Header'

export interface PreviewProps {
  isPreview: boolean
}

const Home = () => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const bannerRef = useRef<HTMLDivElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false)
  const [isPreview, setIsPreview] = useState<boolean>(false)

  useEffect(() => {
    if (!storage.get('accessToken')) {
      setIsPreview(true)
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

  const searchOnPreview = () => {
    openModal(modals.LoginToContinueModal)
  }
  return (
    <HomeContainer>
      <Header
        isMainHeader={true}
        isModalHeader={false}
        title='커뮤니티'
        hasArrow={false}
        hasNotification={true}
      >
        <Search
          fill='black'
          onClick={isPreview ? searchOnPreview : () => navigate('/search')}
        ></Search>
        {/* <NoticeOff></NoticeOff> */}
      </Header>
      <ComponentContainer ref={scrollToTopRef}>
        <div ref={bannerRef}>
          <Banner style={{ height: '100%', width: '100%' }}></Banner>
        </div>
        <Curation></Curation>
        <BuyNow isPreview={isPreview}></BuyNow>
        <WeeklyTopUser isPreview={isPreview}></WeeklyTopUser>
        <NewItems isPreview={isPreview}></NewItems>
        <Divider></Divider>
        <HotCelebItems isPreview={isPreview}></HotCelebItems>
        <Divider></Divider>
        <HowAbout isPreview={isPreview}></HowAbout>
        <div>
          <HotCelebBanner style={{ height: '100%', width: '100%' }}></HotCelebBanner>
        </div>
        <LuxuryMood isPreview={isPreview}></LuxuryMood>
        <Divider></Divider>
        <PresentItem isPreview={isPreview}></PresentItem>
        {showScrollToTop && <ScrollToTop onClick={handleClick} />}
      </ComponentContainer>
    </HomeContainer>
  )
}

export default React.memo(Home)
