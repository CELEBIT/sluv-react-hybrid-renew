import React, { useState } from 'react'
import { TabContainer, Tab, TabName, TabIndicator } from './styles'
import { SetterOrUpdater } from 'recoil'

interface TabProps {
  tabList: Array<Tab>
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>> | SetterOrUpdater<string>
}

interface Tab {
  id: string
  tabName: string
}

const Tabs = ({ tabList, selectedTab, setSelectedTab }: TabProps) => {
  const onclickTab = (tabName: string) => {
    setSelectedTab(tabName)
  }
  return (
    <TabContainer>
      {tabList.map((tab) => {
        return (
          <Tab key={tab.id} onClick={() => onclickTab(tab.id)}>
            <TabName active={selectedTab === tab.id}>{tab.tabName}</TabName>
            <TabIndicator active={selectedTab === tab.id}></TabIndicator>
          </Tab>
        )
      })}
    </TabContainer>
  )
}

export default Tabs
