import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
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
import { convertToImageList, openGallery } from '../../../utils/utility'

const CommentItemPhoto = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [commentObject, setCommentObject] = useRecoilState(commentState)
  const [maxItemPhotoCount, setMaxItemPhotoCount] = useRecoilState(maxItemPhotoCountState)
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  const resetImageItemList = useResetRecoilState(imgItemListState)

  const [onSearch, setOnSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useRecoilState<string>(itemNameSearchState)
  const resetSearchValue = useResetRecoilState(itemNameSearchState)
  const [finalValue, setFinalValue] = useRecoilState<string>(finalSearchState)
  const resetFinalValue = useResetRecoilState(finalSearchState)
  const [debouncedItemName] = useDebounce(searchValue, 500)

  const [selectedTab, setSelectedTab] = useState('recent')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const imgInput = useRef<HTMLInputElement>(null)
  // api file upload용
  const [selectedFileList, setSelectedFileList] = useState<File[]>([])

  // API나오면 recent search로 수정
  const {
    getRecentCeleb: { data },
  } = useRecentCelebQuery()

  const tabList = [
    { id: 'recent', tabName: '최근 본 아이템' },
    { id: 'myUpload', tabName: '내 게시글' },
  ]

  const handleBlur = () => {
    setIsFocused(false)
  }

  const onComplete = () => {
    // 대표사진 설정
    if (imgItemList.length > 0) {
      setImageItemList((prevList) => {
        const updatedList = [...prevList]
        updatedList[0] = {
          ...updatedList[0],
          representFlag: true,
        }
        return updatedList
      })
      // 댓글 아이템 설정
      setCommentObject((prevInfo) => {
        const { itemList, imgList } = prevInfo
        const updatedItemList = itemList ? [...itemList] : []
        const updatedImgList = imgList ? [...imgList] : []

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
          } else if (
            !item.itemId &&
            item.imgUrl &&
            !updatedImgList.some((existingItem) => existingItem.imgUrl === item.imgUrl)
          ) {
            // 사진 추가
            updatedImgList.push({
              imgUrl: item.imgUrl,
              sortOrder: index,
            })
          }
        })

        return {
          ...prevInfo,
          itemList: updatedItemList.length > 0 ? updatedItemList : null,
          imgList: updatedImgList.length > 0 ? updatedImgList : null,
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
      setSelectedFileList((pre) => [...pre, ...Array.from(fileArr)])
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        const reader = new FileReader()
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          reader.onloadend = () => {
            const fileSelected: IselectedItem = {
              imgFile: file,
              imgUrl: reader.result as string,
              description: null,
              vote: null,
              representFlag: !imgItemList && i === 0,
            }
            setImageItemList((prevList) => [...prevList, fileSelected])
          }
          reader.readAsDataURL(file)
        } else {
          alert(`아이템/사진은 ${maxItemPhotoCount}개까지 선택할 수 있어요. `)
          break
        }
      }
    }
  }

  useEffect(() => {
    setMaxItemPhotoCount(5)
  }, [])

  const onBackClick = () => {
    if (onSearch) {
      setOnSearch(false)
    } else {
      resetImageItemList()
      navigate(-1)
    }
    resetFinalValue()
    resetSearchValue()
  }

  const handleFocus = () => {
    setOnSearch(true)
  }

  const onClickOpenGallery = () => {
    if (imgInput.current) {
      imgInput.current.click()
      openGallery(maxItemPhotoCount, maxItemPhotoCount - imgItemList.length)
    }
  }

  const onNativeImgUpload = (fileArr: File[]) => {
    if (fileArr) {
      setSelectedFileList((pre) => [...pre, ...Array.from(fileArr)])
      for (let i = 0; i < fileArr.length; i++) {
        const file = fileArr[i]
        if (imgItemList.length + i + 1 <= maxItemPhotoCount) {
          const fileSelected = {
            imgFile: file,
            description: null,
            vote: null,
            representFlag: !imgItemList && i === 0,
          }
          setImageItemList((prevList) => [...prevList, fileSelected])
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
      const images = convertToImageList(event.detail, imgItemList)
      onNativeImgUpload(images)
    }

    window.addEventListener('getImageFromIOS', handlePhotosMessage)
    return () => {
      window.removeEventListener('getImageFromIOS', handlePhotosMessage)
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

        {/* {searchValue !== '' ? (
          <SearchResult></SearchResult> // <KeywordPreviewContainer keyword={searchValue} />
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
                {selectedTab === 'myUpload' && <UserUploadItem></UserUploadItem>}
              </>
            ) : (
              <>{data ? <RecentSearchItem></RecentSearchItem> : <HotSearchItem></HotSearchItem>}</>
            )}
          </>
        )} */}
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
