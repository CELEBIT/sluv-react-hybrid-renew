import React from 'react'
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

const Home = () => {
  const navigate = useNavigate()
  return (
    <HomeContainer>
      <HeaderWrapper role='heading' isModalHeader={false} style={{ padding: '0.625rem 1.25rem' }}>
        <div className='left'>
          <Logo></Logo>
        </div>
        <div className='right'>
          <Search fill={Common.colors.BK} onClick={() => navigate('/search')}></Search>
        </div>
      </HeaderWrapper>
      <ComponentContainer>
        <div>
          <Banner style={{ height: '100%', width: '100vw' }}></Banner>
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
      </ComponentContainer>
    </HomeContainer>
  )
}

export default Home
