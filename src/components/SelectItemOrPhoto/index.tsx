import React, { useState } from 'react'
import {
  BottomWrapper,
  ComponentContainer,
  ComponentWrapper,
  GalleryButton,
  SelectItemOrPhotoContainer,
} from './styles'

import RecentViewItem from './RecentViewItem'
import Header from '../Header/Header'
import SearchTextfield from '../TextField/SearchTextfield/SearchTextfield'
import { HeaderWrapper } from '../../pages/item/addInfo/styles'
import Tabs from '../Tabs'
import ScrapItem from './ScrapItem'
import ButtonLarge from '../ButtonLarge/ButtonLarge'
import { ReactComponent as Gallery } from '../../assets/gallery_24.svg'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../recoil/communityInfo'

const SelectItemOrPhoto = () => {
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const [searchValue, setSearchValue] = useState('')
  const [selectedTab, setSelectedTab] = useState('recent')

  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'saved', tabName: '찜한 아이템' },
  ]
  return (
    <SelectItemOrPhotoContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='아이템 선택'></Header>
      </HeaderWrapper>
      <ComponentContainer>
        <ComponentWrapper className='padding top'>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            placeholder='셀럽/아이템을 검색해주세요'
            onEnter={() => console.log('entered')}
          ></SearchTextfield>
        </ComponentWrapper>
        <Tabs tabList={tabList} selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Tabs>
        {selectedTab === 'recent' && <RecentViewItem></RecentViewItem>}
        {selectedTab === 'saved' && <ScrapItem></ScrapItem>}
      </ComponentContainer>
      <BottomWrapper>
        <GalleryButton>
          <Gallery></Gallery>
        </GalleryButton>
        <ButtonLarge
          text='선택 완료'
          active={true}
          color='BK'
          onClick={() => console.log('click')}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectItemOrPhotoContainer>
  )
}

export default SelectItemOrPhoto
