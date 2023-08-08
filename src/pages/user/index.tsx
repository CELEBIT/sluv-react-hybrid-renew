import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../../components/Header/Header'
import UserProfile from './components/UserProfile/UserProfile'
import Tabs from '../../components/Tabs'
import Item from '../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import useHotCelebItemQuery from '../../apis/item/hooks/useHotCelebItemQuery'
import ItemListGrid from '../../components/ItemListGrid/ItemListGrid'

const PageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  margin-left: -1.25rem;
  width: 100vw;
  height: 100%;
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
  height: 100%;
`

const StickyTabContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  z-index: 1;
  position: sticky;
  top: -1px;
`

const Tab = styled.div`
  padding: 1rem;
  /* Your tab styling here */
`

const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding-bottom: 3.75rem;
`

const User = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('item')
  const tabList = [
    { id: 'item', tabName: '아이템' },
    { id: 'closet', tabName: '옷장' },
  ]

  const { getHotCelebItem } = useHotCelebItemQuery()
  const { data } = getHotCelebItem('일간')
  return (
    <PageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} />
      </HeaderWrapper>
      <ContentContainer>
        <UserProfile></UserProfile>
        <StickyTabContainer>
          <Tabs tabList={tabList} selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Tabs>
        </StickyTabContainer>
        <ItemListContainer>
          <ItemListGrid data={data} canChangeView={true}></ItemListGrid>
        </ItemListContainer>
      </ContentContainer>
    </PageContainer>
  )
}

export default User
