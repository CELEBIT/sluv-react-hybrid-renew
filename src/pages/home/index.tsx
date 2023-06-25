import React from 'react'
import { ReactComponent as Banner } from '../../assets/TopBanner.svg'
import { HomeContainer } from './styles'
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <HomeContainer>
      <Header title='sluv' isModalHeader={false}></Header>
      <Banner></Banner>
    </HomeContainer>
  )
}

export default Home
