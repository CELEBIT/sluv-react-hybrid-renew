import React, { useEffect, useRef, useState } from 'react'
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
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import {
  communityItemState,
  firstItemState,
  imgItemListState,
  secondItemState,
} from '../../recoil/communityInfo'
import RecentSelectItem from './RecentSearchItem'
import HotSearchItem from './HotSearchItem'
import SearchResult, { itemNameSearchState } from './SearchResult'
import { useNavigate } from 'react-router-dom'
import { atomKeys } from '../../config/atomKeys'
import { communityMenuState } from '../Header/CommunityHeader/CommunityHeader'
import { useDebounce } from 'use-debounce'
import KeywordPreview from './KeywordPreview/KeywordPreview'
import useRecentSearchQuery from '../../apis/search/hooks/useRecentSearchQuery'
import { convertToFile, convertToImageList, openGallery } from '../../utils/utility'
import { toast } from 'react-toastify'

export const maxItemPhotoCountState = atom<number>({
  key: atomKeys.maxItemPhotoCount,
  default: 5,
})

export const finalSearchState = atom<string>({
  key: atomKeys.finalSearchState,
  default: '',
})

const SelectItemOrPhoto = () => {
  const navigate = useNavigate()
  const [onSearch, setOnSearch] = useState<boolean>(false)
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const CommunityMenu = useRecoilValue(communityMenuState)
  const [maxItemPhotoCount, setMaxItemPhotoCount] = useRecoilState(maxItemPhotoCountState)

  const [searchValue, setSearchValue] = useRecoilState<string>(itemNameSearchState)
  const resetSearchValue = useResetRecoilState(itemNameSearchState)
  const [finalValue, setFinalValue] = useRecoilState<string>(finalSearchState)
  const resetFinalValue = useResetRecoilState(finalSearchState)
  const [debouncedItemName] = useDebounce(searchValue, 500)
  const [selectedTab, setSelectedTab] = useState('recent')

  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'saved', tabName: '찜한 아이템' },
  ]
  const onComplete = () => {
    // 대표사진 설정
    // console.log('imgItemList in selectITem ', imgItemList)
    if (imgItemList.length > 0) {
      setImageItemList((prevList) => {
        const updatedList = prevList.map((item, index) => ({
          ...item,
          sortOrder: index,
          representFlag: index === 0,
        }))
        return updatedList
      })
      // 커뮤니티 아이템 설정
      setCommunityUploadInfo((prevInfo) => {
        const updatedList = [...imgItemList]
        updatedList[0] = {
          ...updatedList[0],
          representFlag: true,
        }
        const { itemList, imgList } = prevInfo
        const updatedItemList = itemList ? [...itemList] : []

        updatedList.forEach((item, index) => {
          if (
            item.itemId &&
            !updatedItemList.some((existingItem) => existingItem.itemId === item.itemId)
          ) {
            // 아이템 추가
            if (CommunityMenu === '이 중에 뭐 살까') {
              if (index === 0) {
                updatedItemList.push({
                  itemId: item.itemId,
                  description: firstItem.description,
                  sortOrder: index,
                  // vote: null,
                  representFlag: item.representFlag,
                })
              } else {
                updatedItemList.push({
                  itemId: item.itemId,
                  description: secondItem.description,
                  sortOrder: index,
                  // vote: null,
                  representFlag: item.representFlag,
                })
              }
            } else {
              updatedItemList.push({
                itemId: item.itemId,
                description: item.description,
                sortOrder: index,
                // vote: null,
                representFlag: item.representFlag,
              })
            }
          }
        })
        return {
          ...prevInfo,
          itemList: updatedItemList.length > 0 ? updatedItemList : null,
          // imgList: updatedImgList.length > 0 ? updatedImgList : null,
        }
      })
    }
    resetSearchValue()
    navigate(-1)
  }

  useEffect(() => {
    if (CommunityMenu === '이 중에 뭐 살까') {
      setMaxItemPhotoCount(2)
    } else {
      setMaxItemPhotoCount(5)
    }
  }, [])

  // display
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)

  // imgItemList에 IselectedItem 형태로 추가해줘야함
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files
    if (fileArr) {
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        const reader = new FileReader()
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          reader.onloadend = () => {
            const fileSelected = {
              imgFile: file,
              imgFileUrl: URL.createObjectURL(file),
              description: null,
              vote: null,
              representFlag: !imgItemList && i === 0,
            }
            if (CommunityMenu === '이 중에 뭐 살까') {
              if (file) {
                if (i === 0) {
                  // firstItem || secondItem 둘중에 하나라도 null 이면 추가 가능
                  if (firstItem.imgFile === null && firstItem.itemId === null) {
                    // firstItem이 비어있을 때
                    setFirstItem((prev) => ({
                      ...prev,
                      ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                    }))
                  } else if (firstItem.imgFile || firstItem.itemId) {
                    // first가 존재할 때
                    setSecondItem((prev) => ({
                      ...prev,
                      ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                    }))
                  }
                } else {
                  // 두번째 사진 -> firstItem, secondItem 둘다 없을 때만 가능
                  // secondItem에만 추가하면 됨.
                  // console.log('i==1')
                  if (secondItem.imgFile === null && secondItem.itemId === null) {
                    // console.log('seconds 아이템 null')
                    setSecondItem((prev) => ({
                      ...prev,
                      ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                    }))
                    // console.log('secondItem', secondItem)
                  }
                }
              }
              setImageItemList((prevList) => [...prevList, fileSelected])
            } else {
              setImageItemList((prevList) => [...prevList, fileSelected])
            }
          }
          reader.readAsDataURL(file)
        } else {
          toast(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }
  const onNativeImgUpload = (fileArr: File[]) => {
    if (fileArr) {
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          const fileSelected = {
            imgFile: file,
            imgFileUrl: URL.createObjectURL(file),
            imgUrl: null,
            description: null,
            vote: null,
            representFlag: !imgItemList && i === 0,
          }
          if (CommunityMenu === '이 중에 뭐 살까') {
            if (file) {
              if (i === 0) {
                // console.log(firstItem)
                // firstItem || secondItem 둘중에 하나라도 null 이면 추가 가능
                if (firstItem.imgFile === null && firstItem.itemId === null) {
                  // firstItem이 비어있을 때
                  // console.log('first item 없음')
                  setFirstItem((prev) => ({
                    ...prev,
                    ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                  }))
                  // console.log('firstItem', firstItem)
                } else if (firstItem.imgFile || firstItem.itemId) {
                  // first가 존재할 때
                  // console.log('seconds 아이템 null')
                  setSecondItem((prev) => ({
                    ...prev,
                    ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                  }))
                }
              } else {
                // 두번째 사진 -> firstItem, secondItem 둘다 없을 때만 가능
                // secondItem에만 추가하면 됨.
                // console.log('i==1')
                if (secondItem.imgFile === null && secondItem.itemId === null) {
                  // console.log('seconds 아이템 null')
                  setSecondItem((prev) => ({
                    ...prev,
                    ...{ imgFile: file, imgFileUrl: URL.createObjectURL(file) },
                  }))
                  // console.log('secondItem', secondItem)
                }
              }
            }
            setImageItemList((prevList) => [...prevList, fileSelected])
          } else {
            setImageItemList((prevList) => [...prevList, fileSelected])
          }
        } else {
          toast(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }

  const handleFocus = () => {
    setOnSearch(true)
  }
  const handleEnter = () => {
    setFinalValue(searchValue)
  }
  const {
    getRecentSearch: { data },
  } = useRecentSearchQuery()

  const onBackClick = () => {
    if (onSearch) {
      setOnSearch(false)
    } else {
      navigate(-1)
    }
    resetFinalValue()
    resetSearchValue()
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onClickOpenGallery = () => {
    openGallery(5, 5 - imgItemList.length, fileInputRef)
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      const images = convertToFile(event.detail)
      onNativeImgUpload(images)
    }

    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      const parsedData = JSON.parse(event.data) // 문자열을 객체로 변환
      const images = convertToFile(parsedData.detail)
      onNativeImgUpload(images)
    }

    document.addEventListener('message', handlePhotosMessage)
    return () => {
      document.removeEventListener('message', handlePhotosMessage)
    }
  }, [])

  return (
    <SelectItemOrPhotoContainer>
      <HeaderWrapper>
        <Header
          isModalHeader={false}
          hasArrow={true}
          title='아이템 선택'
          backBtnClick={onBackClick}
        ></Header>
      </HeaderWrapper>
      <ComponentContainer>
        <ComponentWrapper className='padding top' onFocus={handleFocus}>
          <SearchTextfield
            value={searchValue}
            setValue={setSearchValue}
            placeholder='셀럽/아이템을 검색해주세요'
            onEnter={handleEnter}
          ></SearchTextfield>
        </ComponentWrapper>
        {!onSearch ? (
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
          <>
            {searchValue !== '' ? (
              <>
                {searchValue === finalValue ? (
                  <SearchResult></SearchResult>
                ) : (
                  <KeywordPreview keyword={debouncedItemName}></KeywordPreview>
                )}
              </>
            ) : (
              <>
                {(data?.length ?? 0) > 0 ? (
                  <RecentSelectItem></RecentSelectItem>
                ) : (
                  <HotSearchItem></HotSearchItem>
                )}
              </>
            )}
          </>
        )}
      </ComponentContainer>
      <Dimmer></Dimmer>
      <BottomWrapper>
        <GalleryButton onClick={onClickOpenGallery}>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={onChangeImg}
            multiple
          />
          <Gallery></Gallery>
        </GalleryButton>
        <ButtonLarge
          text={`선택완료(${imgItemList?.length}/${maxItemPhotoCount}) `}
          active={imgItemList?.length > 0}
          color='BK'
          onClick={onComplete}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectItemOrPhotoContainer>
  )
}

export default SelectItemOrPhoto
