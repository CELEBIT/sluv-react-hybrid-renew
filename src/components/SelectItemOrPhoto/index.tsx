import React, { useEffect, useState } from 'react'
import {
  BottomWrapper,
  ComponentContainer,
  ComponentWrapper,
  Dimmer,
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
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  secondItemState,
} from '../../recoil/communityInfo'
import RecentSelectCeleb from '../BottomSheetModal/ItemCelebModal/RecentSelectCeleb'
import useRecentCelebQuery from '../../apis/celeb/hooks/useRecentCelebQuery'
import RecentSelectItem from './RecentSearchItem'
import HotSearchItem from './HotSearchItem'
import SearchResult from './SearchResult'
import { brandNameSearchState } from '../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import { useNavigate } from 'react-router-dom'
import { atomKeys } from '../../config/atomKeys'
import { communityMenuState } from '../Header/CommunityHeader/CommunityHeader'

export const maxItemPhotoCountState = atom<number>({
  key: atomKeys.maxItemPhotoCount,
  default: 0,
})

const SelectItemOrPhoto = () => {
  const navigate = useNavigate()
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const CommunityMenu = useRecoilValue(communityMenuState)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const [maxItemPhotoCount, setMaxItemPhotoCount] = useRecoilState(maxItemPhotoCountState)
  const [searchValue, setSearchValue] = useRecoilState<string>(brandNameSearchState)
  const [selectedTab, setSelectedTab] = useState('recent')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  // const firstItem = useRecoilValue(firstItemState)
  // const secondItem = useRecoilValue(secondItemState)
  // console.log('firstItem', firstItem)
  // console.log('secondItem', secondItem)

  // API나오면 recent search로 수정
  const {
    getRecentCeleb: { data },
  } = useRecentCelebQuery()

  const handleBlur = () => {
    setIsFocused(false)
  }
  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'saved', tabName: '찜한 아이템' },
  ]
  const onComplete = () => {
    navigate(-1)
  }
  useEffect(() => {
    if (CommunityMenu === '찾아주세요') {
      setMaxItemPhotoCount(5)
    } else {
      if (communityQuestionMenu === '이 중에 뭐 살까') {
        setMaxItemPhotoCount(2)
      } else {
        setMaxItemPhotoCount(5)
      }
    }
  }, [])
  return (
    <SelectItemOrPhotoContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='아이템 선택'></Header>
      </HeaderWrapper>
      <ComponentContainer>
        <ComponentWrapper
          className='padding top'
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        >
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            placeholder='셀럽/아이템을 검색해주세요'
            onEnter={() => console.log('entered')}
          ></SearchTextfield>
        </ComponentWrapper>

        {searchValue !== '' ? (
          <SearchResult></SearchResult>
        ) : (
          <>
            {isFocused === false ? (
              <>
                <Tabs
                  tabList={tabList}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                ></Tabs>
                {selectedTab === 'recent' && <RecentViewItem></RecentViewItem>}
                {selectedTab === 'saved' && <ScrapItem></ScrapItem>}
              </>
            ) : (
              <>{data ? <RecentSelectItem></RecentSelectItem> : <HotSearchItem></HotSearchItem>}</>
            )}
          </>
        )}
      </ComponentContainer>
      <Dimmer></Dimmer>
      <BottomWrapper>
        <GalleryButton>
          <Gallery></Gallery>
        </GalleryButton>
        <ButtonLarge
          text={`선택완료(${
            (communityUploadInfo.imgList?.length ?? 0) + (communityUploadInfo.itemList?.length ?? 0)
          }/${maxItemPhotoCount}) `}
          active={
            (communityUploadInfo.imgList?.length ?? 0) +
              (communityUploadInfo.itemList?.length ?? 0) >=
            1
          }
          color='BK'
          onClick={() => onComplete()}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectItemOrPhotoContainer>
  )
}

export default SelectItemOrPhoto
