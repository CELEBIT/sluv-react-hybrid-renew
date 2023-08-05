import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../../components/Header/Header'
import UserProfile from './components/UserProfile/UserProfile'

const PageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  margin-left: -1.25rem;
  width: 100vw;
  max-height: 100vh;
  padding-left: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`

const HeaderWrapper = styled.header`
  padding: 0 1.25rem;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Enable scrolling for the content */
`

const ProfileContainer = styled.div`
  padding: 1rem;
  background-color: #f7f7f7;
`

const Profile = styled.div`
  /* Your profile styling here */
`

const StickyTabContainer = styled.div<{ isSticky: boolean }>`
  display: flex;
  background-color: white;
  width: 100%;
  z-index: 1;
  position: ${(props) => (props.isSticky ? 'sticky' : 'static')};
  top: 0;
  border: 1px solid red;
  /* Additional styling for sticky and non-sticky states */
`

const Tab = styled.div`
  padding: 1rem;
  /* Your tab styling here */
`

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* Additional styling for the item list container */
`

const Item = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0.5rem;
  /* Your item styling here */
`

// Other styled components...

const User = () => {
  const [isTabSticky, setIsTabSticky] = useState(false)
  const itemListData = [1, 2, 3, 45, 6, 7, 8, 8, 8, 9, 10, 11, 12, 123] // Replace with your actual item data

  const handleScroll = () => {
    const tabContainer = document.getElementById('tab-container')
    const contentContainer = document.getElementById('content-container')

    if (tabContainer && contentContainer) {
      setIsTabSticky(tabContainer.offsetTop <= contentContainer.scrollTop)
    }
  }

  useEffect(() => {
    const contentContainer = document.getElementById('content-container')
    if (contentContainer) {
      handleScroll()

      contentContainer.addEventListener('scroll', handleScroll)
      contentContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} />
      </HeaderWrapper>
      <ContentContainer id='content-container'>
        <UserProfile></UserProfile>
        <StickyTabContainer id='tab-container' isSticky={isTabSticky}>
          <Tab>Item</Tab>
          <Tab>옷장</Tab>
        </StickyTabContainer>
        <ItemListContainer>
          {itemListData.map((item) => (
            <Item key={item}>Item {item}</Item>
          ))}
        </ItemListContainer>
      </ContentContainer>
    </PageContainer>
  )
}

export default User
