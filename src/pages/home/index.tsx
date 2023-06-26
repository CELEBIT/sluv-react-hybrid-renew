import React from 'react'
import { ReactComponent as Banner } from '../../assets/TopBanner.svg'
import { ReactComponent as HotCelebBanner } from '../../assets/HotCelebBanner.svg'

import { HomeContainer } from './styles'
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

const Home = () => {
  return (
    <HomeContainer>
      <Header title='sluv' isModalHeader={false}></Header>
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
    </HomeContainer>
  )
}

export default Home
