import React, { useState } from 'react'
import { Tab, TabName, TabIndicator, ScrollTabContainer } from './styles'

interface TabProps {
  tabList: Array<Tab>
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

interface Tab {
  id: string
  tabName: string
}

const ScrollTabs = ({ tabList, selectedTab, setSelectedTab }: TabProps) => {
  const onclickTab = (tabName: string) => {
    setSelectedTab(tabName)
  }
  return (
    <ScrollTabContainer>
      {tabList.map((tab) => {
        return (
          <Tab key={tab.id} onClick={() => onclickTab(tab.id)}>
            <TabName active={selectedTab === tab.id}>{tab.tabName}</TabName>
            <TabIndicator active={selectedTab === tab.id}></TabIndicator>
          </Tab>
        )
      })}
    </ScrollTabContainer>
  )
}

export default ScrollTabs
