import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { commentState } from '../../../pages/community/detail/CommunityDetail'
import { finalSearchState, maxItemPhotoCountState } from '..'
import { IselectedItem, imgItemListState } from '../../../recoil/communityInfo'
import SearchResult, { itemNameSearchState } from '../SearchResult'
import {
  BottomWrapper,
  ComponentContainer,
  ComponentWrapper,
  Dimmer,
  GalleryButton,
  SelectItemOrPhotoContainer,
} from '../styles'
import { HeaderWrapper } from '../../../pages/item/addInfo/styles'
import Header from '../../Header/Header'
import SearchTextfield from '../../TextField/SearchTextfield/SearchTextfield'
import Tabs from '../../Tabs'
import RecentViewItem from '../RecentViewItem'
import RecentSearchItem from '../RecentSearchItem'
import HotSearchItem from '../HotSearchItem'
import { ReactComponent as Gallery } from '../../../assets/gallery_24.svg'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import ScrapItem from '../ScrapItem'
import UserUploadItem from '../UserUploadItem'
import KeywordPreviewContainer from '../../../pages/search/components/KeywordPreviewContainer'
import { useDebounce } from 'use-debounce'
import KeywordPreview from '../KeywordPreview/KeywordPreview'
import { convertToFile, convertToImageList, openGallery } from '../../../utils/utility'
import useRecentSearchQuery from '../../../apis/search/hooks/useRecentSearchQuery'

const CommentItemPhoto = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setCommentObject = useSetRecoilState(commentState)
  const [maxItemPhotoCount, setMaxItemPhotoCount] = useRecoilState(maxItemPhotoCountState)
  const [imgItemList, setImgItemList] = useRecoilState(imgItemListState)
  const resetImgItemList = useResetRecoilState(imgItemListState)

  const [onSearch, setOnSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useRecoilState<string>(itemNameSearchState)
  const resetSearchValue = useResetRecoilState(itemNameSearchState)
  const [finalValue, setFinalValue] = useRecoilState<string>(finalSearchState)
  const resetFinalValue = useResetRecoilState(finalSearchState)
  const [debouncedItemName] = useDebounce(searchValue, 500)

  const [selectedTab, setSelectedTab] = useState('recent')
  const imgInput = useRef<HTMLInputElement>(null)
  // api file upload용

  // API나오면 recent search로 수정
  const {
    getRecentSearch: { data },
  } = useRecentSearchQuery()

  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'myUpload', tabName: '내 게시글' },
  ]

  const onBackClick = () => {
    if (onSearch) {
      setOnSearch(false)
    } else {
      resetImgItemList()
      navigate(-1)
    }
    resetFinalValue()
    resetSearchValue()
  }

  const handleFocus = () => {
    setOnSearch(true)
  }

  const onComplete = () => {
    console.log('imgItemList in commentItemPhoto', imgItemList)
    if (imgItemList.length > 0) {
      setImgItemList((prevList) => {
        const updatedList = prevList.map((item, index) => ({
          ...item,
          sortOrder: index,
          representFlag: index === 0,
        }))
        return updatedList
      })
      // 댓글 아이템 설정
      setCommentObject((prevInfo) => {
        const { itemList, imgList } = prevInfo
        const updatedItemList = itemList ? [...itemList] : []

        imgItemList.forEach((item, index) => {
          if (
            item.itemId &&
            !updatedItemList.some((existingItem) => existingItem.itemId === item.itemId)
          ) {
            // 아이템 추가
            updatedItemList.push({
              itemId: item.itemId,
              sortOrder: index,
            })
          }
        })
        return {
          ...prevInfo,
          itemList: updatedItemList.length > 0 ? updatedItemList : null,
        }
      })
    }
    if (location.state === 'edit') navigate(-1)
    else if (location.state?.name === 'subcomment')
      navigate('/community/subcomment/upload', { state: location.state.comment })
    else navigate('/community/comment/upload')
  }

  // imgItemList에 IselectedItem 형태로 추가해줘야함
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files
    if (fileArr) {
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        const reader = new FileReader()
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          reader.onloadend = () => {
            const fileSelected: IselectedItem = {
              imgFile: file,
              imgUrl: null,
              description: null,
              representFlag: false,
            }
            setImgItemList((prevList) => [...prevList, fileSelected])
          }
          reader.readAsDataURL(file)
        } else {
          alert(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }

  // Native Img Picker
  const onClickOpenGallery = () => {
    if (
      typeof window !== 'undefined' &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.IOSBridge
    ) {
      openGallery(5, 5 - imgItemList.length)
    } else if (imgInput.current) {
      imgInput.current.click()
    }
  }

  const onNativeImgUpload = (fileArr: File[]) => {
    console.log('fileArr in onNativeImgUpload', fileArr)
    if (fileArr) {
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          const fileSelected = {
            imgFile: file,
            imgUrl: null,
            description: null,
            vote: null,
            representFlag: false,
          }
          setImgItemList((prevList) => [...prevList, fileSelected])
        } else {
          alert(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }

  useEffect(() => {
    // 메시지 리스너 함수
    const handlePhotosMessage = (event: any) => {
      const images = convertToFile(event.detail)
      console.log(images)
      onNativeImgUpload(images)
    }

    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
    }
  }, [])

  useEffect(() => {
    setMaxItemPhotoCount(5)
  })

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
            onEnter={() => setFinalValue(searchValue)}
            placeholder='셀럽/아이템을 검색해주세요'
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
            {selectedTab === 'myUpload' && <UserUploadItem></UserUploadItem>}
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
                  <RecentSearchItem></RecentSearchItem>
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
            ref={imgInput}
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
          onClick={imgItemList?.length > 0 ? () => onComplete() : ''}
        ></ButtonLarge>
      </BottomWrapper>
    </SelectItemOrPhotoContainer>
  )
}

export default CommentItemPhoto
